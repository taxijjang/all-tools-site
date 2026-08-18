// 날짜 계산은 틀려도 화면상으로는 그럴듯해 보인다. 나이 한 살, 하루 차이는
// 눈으로 검수가 안 되므로 규칙을 못박아 둔다. 윤년·말일·요일 경계가 핵심이다.
import assert from 'node:assert/strict';
import {
  addBusinessDays,
  addToDate,
  countWeekdays,
  dateDiff,
  daysUntilBirthday,
  dday,
  formatDate,
  koreanAges,
  parseDateInput,
  weekday,
} from '../src/date-math.js';

let checks = 0;
const eq = (actual, expected, label) => {
  assert.deepEqual(actual, expected, `${label}: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
  checks += 1;
};

// --- 입력 파싱: 존재하지 않는 날짜를 조용히 넘기지 않는다 ---
eq(parseDateInput('2026-02-30'), null, '2월 30일은 거부');
eq(parseDateInput('2025-02-29'), null, '평년 2월 29일은 거부');
eq(parseDateInput('2024-02-29'), { y: 2024, m: 2, d: 29 }, '윤년 2월 29일은 통과');
eq(parseDateInput('2026-13-01'), null, '13월은 거부');
eq(parseDateInput('26-01-01'), null, '두 자리 연도는 거부');

// --- 만 나이 / 세는 나이 / 연 나이 ---
// 1990-06-15 생, 오늘 2026-06-14 (생일 하루 전)
eq(koreanAges({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 14 }),
   { man: 35, se: 37, yeon: 36 }, '생일 전날');
// 생일 당일에 만 나이가 오른다
eq(koreanAges({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 15 }),
   { man: 36, se: 37, yeon: 36 }, '생일 당일');
eq(koreanAges({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 16 }),
   { man: 36, se: 37, yeon: 36 }, '생일 다음날');
// 12월 31일생은 다음날 세는 나이가 두 살 오르는 것처럼 보인다(해가 바뀌므로)
eq(koreanAges({ y: 2025, m: 12, d: 31 }, { y: 2025, m: 12, d: 31 }),
   { man: 0, se: 1, yeon: 0 }, '태어난 날');
eq(koreanAges({ y: 2025, m: 12, d: 31 }, { y: 2026, m: 1, d: 1 }),
   { man: 0, se: 2, yeon: 1 }, '12월 31일생, 하루 뒤');

// --- 다음 생일까지 ---
eq(daysUntilBirthday({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 15 }), 0, '생일 당일은 0');
eq(daysUntilBirthday({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 14 }), 1, '하루 남음');
eq(daysUntilBirthday({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 16 }), 364, '지났으면 내년');
// 2월 29일생은 평년에 2월 28일로 당긴다
eq(daysUntilBirthday({ y: 2000, m: 2, d: 29 }, { y: 2026, m: 2, d: 27 }), 1, '2/29생 평년');

// --- 날짜 차이 ---
eq(dateDiff({ y: 2026, m: 1, d: 1 }, { y: 2026, m: 1, d: 1 }),
   { days: 0, inclusiveDays: 1, weeks: 0, weekRestDays: 0,
     ymd: { years: 0, months: 0, days: 0 }, order: 'same' }, '같은 날');
eq(dateDiff({ y: 2026, m: 1, d: 1 }, { y: 2026, m: 1, d: 8 }).weeks, 1, '7일은 1주');
eq(dateDiff({ y: 2026, m: 1, d: 1 }, { y: 2026, m: 1, d: 10 }),
   { days: 9, inclusiveDays: 10, weeks: 1, weekRestDays: 2,
     ymd: { years: 0, months: 0, days: 9 }, order: 'forward' }, '9일 차이');
// 윤년을 지나는 1년
eq(dateDiff({ y: 2024, m: 1, d: 1 }, { y: 2025, m: 1, d: 1 }).days, 366, '2024는 366일');
eq(dateDiff({ y: 2025, m: 1, d: 1 }, { y: 2026, m: 1, d: 1 }).days, 365, '2025는 365일');
// 말일 걸친 개월 계산
eq(dateDiff({ y: 2026, m: 1, d: 31 }, { y: 2026, m: 3, d: 1 }).ymd,
   { years: 0, months: 1, days: 1 }, '1/31 -> 3/1');
// 말일 자르기 규칙이 dateDiff 와 addToDate 에서 같아야 한다
eq(dateDiff({ y: 2026, m: 1, d: 31 }, { y: 2026, m: 2, d: 28 }).ymd,
   { years: 0, months: 1, days: 0 }, '1/31 -> 2/28 은 딱 1개월');
eq(dateDiff({ y: 2026, m: 1, d: 31 }, { y: 2026, m: 2, d: 27 }).ymd,
   { years: 0, months: 0, days: 27 }, '1/31 -> 2/27 은 0개월');
eq(dateDiff({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 14 }).ymd,
   { years: 35, months: 11, days: 30 }, '35년 11개월 30일');
eq(dateDiff({ y: 1990, m: 6, d: 15 }, { y: 2026, m: 6, d: 15 }).ymd,
   { years: 36, months: 0, days: 0 }, '딱 36년');
// ymd 를 다시 더하면 도착일이 나와야 한다 (두 함수의 정합성)
for (const [from, to] of [
  [{ y: 2026, m: 1, d: 31 }, { y: 2026, m: 3, d: 1 }],
  [{ y: 2024, m: 2, d: 29 }, { y: 2026, m: 8, d: 15 }],
  [{ y: 2020, m: 12, d: 31 }, { y: 2021, m: 1, d: 1 }],
]) {
  const { ymd } = dateDiff(from, to);
  const back = addToDate(addToDate(from, { years: ymd.years, months: ymd.months }), { days: ymd.days });
  eq(formatDate(back), formatDate(to), `왕복 ${formatDate(from)}->${formatDate(to)}`);
}

// 순서를 뒤집어도 일수는 같다
eq(dateDiff({ y: 2026, m: 3, d: 1 }, { y: 2026, m: 1, d: 31 }).days,
   dateDiff({ y: 2026, m: 1, d: 31 }, { y: 2026, m: 3, d: 1 }).days, '역순 대칭');
eq(dateDiff({ y: 2026, m: 3, d: 1 }, { y: 2026, m: 1, d: 31 }).order, 'backward', '역순 표시');

// --- 날짜 더하기 (말일 자르기) ---
eq(formatDate(addToDate({ y: 2026, m: 1, d: 31 }, { months: 1 })), '2026-02-28', '1/31+1개월=2/28');
eq(formatDate(addToDate({ y: 2024, m: 1, d: 31 }, { months: 1 })), '2024-02-29', '윤년 1/31+1개월');
eq(formatDate(addToDate({ y: 2026, m: 3, d: 31 }, { months: -1 })), '2026-02-28', '3/31-1개월');
eq(formatDate(addToDate({ y: 2024, m: 2, d: 29 }, { years: 1 })), '2025-02-28', '2/29+1년');
eq(formatDate(addToDate({ y: 2026, m: 12, d: 15 }, { months: 1 })), '2027-01-15', '해 넘김');
eq(formatDate(addToDate({ y: 2026, m: 1, d: 15 }, { months: -1 })), '2025-12-15', '해 역넘김');
eq(formatDate(addToDate({ y: 2026, m: 1, d: 1 }, { days: 100 })), '2026-04-11', '+100일');
eq(formatDate(addToDate({ y: 2026, m: 1, d: 1 }, { weeks: 2, days: 3 })), '2026-01-18', '2주 3일');

// --- 영업일 ---
// 2026-01-01은 목요일
eq(weekday({ y: 2026, m: 1, d: 1 }), 4, '2026-01-01은 목요일');
eq(formatDate(addBusinessDays({ y: 2026, m: 1, d: 1 }, 1)), '2026-01-02', '목 +1영업일=금');
eq(formatDate(addBusinessDays({ y: 2026, m: 1, d: 1 }, 2)), '2026-01-05', '주말을 건너뛴다');
eq(formatDate(addBusinessDays({ y: 2026, m: 1, d: 5 }, -1)), '2026-01-02', '역방향도 주말 건너뜀');
eq(countWeekdays({ y: 2026, m: 1, d: 5 }, { y: 2026, m: 1, d: 9 }), 5, '월~금은 5일');
eq(countWeekdays({ y: 2026, m: 1, d: 5 }, { y: 2026, m: 1, d: 11 }), 5, '한 주에 평일 5일');

// --- 디데이 ---
eq(dday({ y: 2026, m: 3, d: 1 }, { y: 2026, m: 3, d: 1 }).label, 'D-DAY', '당일');
eq(dday({ y: 2026, m: 3, d: 1 }, { y: 2026, m: 2, d: 28 }).label, 'D-1', '하루 전');
eq(dday({ y: 2026, m: 2, d: 28 }, { y: 2026, m: 3, d: 1 }).label, 'D+1', '하루 뒤');
eq(dday({ y: 2026, m: 3, d: 1 }, { y: 2026, m: 3, d: 1 }).countUpDays, 1, '첫날은 1일째');
eq(dday({ y: 2026, m: 3, d: 1 }, { y: 2026, m: 3, d: 2 }).countUpDays, 2, '이튿날은 2일째');
eq(dday({ y: 2026, m: 3, d: 2 }, { y: 2026, m: 3, d: 1 }).countUpDays, null, '미래는 카운트업 없음');

console.log(`DATE MATH PASS: ${checks} checks`);
