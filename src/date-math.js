// 날짜 계산의 순수 함수만 모았다. DOM도 CSS도 안 건드리므로 Node에서
// 그대로 테스트할 수 있다(scripts/test-date-math.mjs).
//
// 날짜 차이는 Date.UTC 로 계산한다. 로컬 Date 로 밀리초를 빼면 일광절약시간
// 전환이 끼는 구간에서 하루가 23시간이 되어 결과가 1일씩 틀어진다.

const MS_PER_DAY = 86400000;

export function toUtcDays({ y, m, d }) {
  return Math.floor(Date.UTC(y, m - 1, d) / MS_PER_DAY);
}

export function parseDateInput(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec((value || '').trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  // 2월 30일 같은 값은 Date 가 조용히 3월로 넘긴다. 되돌려 확인한다.
  const probe = new Date(Date.UTC(y, m - 1, d));
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) {
    return null;
  }
  return { y, m, d };
}

export function formatDate({ y, m, d }) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function daysInMonth(y, m) {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

// 0=일요일 .. 6=토요일
export function weekday({ y, m, d }) {
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

// 만 나이 / 세는 나이 / 연 나이.
// 만 나이는 생일이 지났는지로 갈리고, 세는 나이는 해가 바뀌면 오르고,
// 연 나이는 병역법·청소년보호법에서 쓰는 "올해 - 태어난 해"다.
export function koreanAges(birth, today) {
  const beforeBirthday = today.m < birth.m || (today.m === birth.m && today.d < birth.d);
  return {
    man: today.y - birth.y - (beforeBirthday ? 1 : 0),
    se: today.y - birth.y + 1,
    yeon: today.y - birth.y,
  };
}

// 다음 생일까지 남은 일수. 생일이 오늘이면 0.
export function daysUntilBirthday(birth, today) {
  let next = { y: today.y, m: birth.m, d: birth.d };
  // 2월 29일생은 평년에 3월 1일로 넘기지 않고 2월 28일로 당긴다.
  if (birth.m === 2 && birth.d === 29 && daysInMonth(next.y, 2) === 28) {
    next = { ...next, d: 28 };
  }
  if (toUtcDays(next) < toUtcDays(today)) {
    next = { y: today.y + 1, m: birth.m, d: birth.d };
    if (birth.m === 2 && birth.d === 29 && daysInMonth(next.y, 2) === 28) {
      next = { ...next, d: 28 };
    }
  }
  return toUtcDays(next) - toUtcDays(today);
}

// 두 날짜의 차이. inclusive 는 "당일 포함" - 숙박, 근무일, 대회 기간처럼
// 시작일도 하루로 세는 경우가 많아 같이 낸다.
export function dateDiff(from, to) {
  const a = toUtcDays(from);
  const b = toUtcDays(to);
  const days = Math.abs(b - a);
  const [early, late] = a <= b ? [from, to] : [to, from];

  // 개월 수를 먼저 최대로 잡고 남은 일수는 실제 날짜 차이로 센다.
  // 이전 달 일수를 빌리는 흔한 방식은 1/31 -> 3/1 에서 깨진다
  // (31일을 28일로 못 메워 -2일이 나온다). addToDate 의 말일 자르기와
  // 같은 규칙을 써야 두 기능의 결과가 서로 어긋나지 않는다.
  let totalMonths = (late.y - early.y) * 12 + (late.m - early.m);
  if (totalMonths > 0 && toUtcDays(addToDate(early, { months: totalMonths })) > toUtcDays(late)) {
    totalMonths -= 1;
  }
  const anchor = addToDate(early, { months: totalMonths });
  const dayPart = toUtcDays(late) - toUtcDays(anchor);

  return {
    days,
    inclusiveDays: days + 1,
    weeks: Math.floor(days / 7),
    weekRestDays: days % 7,
    ymd: {
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12,
      days: dayPart,
    },
    order: a === b ? 'same' : a < b ? 'forward' : 'backward',
  };
}

// 기준일 ± 기간. 개월/년은 말일을 넘기지 않도록 자른다.
// 1월 31일 + 1개월은 JS Date 에 그대로 맡기면 3월 3일이 되는데,
// 민법의 기간 계산과 사람들 기대는 2월 28일(말일)이다.
export function addToDate(base, { years = 0, months = 0, weeks = 0, days = 0 } = {}) {
  let y = base.y + years;
  let monthIndex = base.m - 1 + months;
  y += Math.floor(monthIndex / 12);
  monthIndex = ((monthIndex % 12) + 12) % 12;
  const m = monthIndex + 1;
  const d = Math.min(base.d, daysInMonth(y, m));

  const shifted = toUtcDays({ y, m, d }) + weeks * 7 + days;
  const result = new Date(shifted * MS_PER_DAY);
  return {
    y: result.getUTCFullYear(),
    m: result.getUTCMonth() + 1,
    d: result.getUTCDate(),
  };
}

// 주말을 뺀 영업일 이동. 기준일은 세지 않고 다음 영업일부터 센다.
export function addBusinessDays(base, count) {
  const step = count >= 0 ? 1 : -1;
  let remaining = Math.abs(count);
  let cursor = toUtcDays(base);
  while (remaining > 0) {
    cursor += step;
    const day = new Date(cursor * MS_PER_DAY).getUTCDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  const result = new Date(cursor * MS_PER_DAY);
  return {
    y: result.getUTCFullYear(),
    m: result.getUTCMonth() + 1,
    d: result.getUTCDate(),
  };
}

// 두 날짜 사이의 평일 수(당일 포함, 주말 제외).
export function countWeekdays(from, to) {
  const a = Math.min(toUtcDays(from), toUtcDays(to));
  const b = Math.max(toUtcDays(from), toUtcDays(to));
  let weekdays = 0;
  for (let cursor = a; cursor <= b; cursor += 1) {
    const day = new Date(cursor * MS_PER_DAY).getUTCDay();
    if (day !== 0 && day !== 6) weekdays += 1;
  }
  return weekdays;
}

// 디데이. 한국 관례로 목표일 당일이 D-DAY, 하루 전이 D-1, 하루 뒤가 D+1이다.
// countUp 은 "만난 날부터 며칠"처럼 첫날을 1일로 세는 방식이다.
export function dday(target, today) {
  const diff = toUtcDays(target) - toUtcDays(today);
  const label = diff === 0 ? 'D-DAY' : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  return {
    label,
    days: diff,
    countUpDays: diff <= 0 ? Math.abs(diff) + 1 : null,
  };
}
