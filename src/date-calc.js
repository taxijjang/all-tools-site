import './style.css';
import { t } from './i18n.js';
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
} from './date-math.js';

const el = (id) => document.getElementById(id);
const message = el('dcMessage');

function setMessage(text, error = false) {
  message.textContent = text;
  message.classList.toggle('message--error', error);
}

// 오늘 날짜는 로컬 기준으로 읽는다. UTC 로 읽으면 한국 시간 오전 9시 이전에
// 하루 전 날짜가 나와서 만 나이와 디데이가 하루씩 틀어진다.
function todayLocal() {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

function readDate(id, fallback = null) {
  const parsed = parseDateInput(el(id)?.value);
  return parsed || fallback;
}

function readNumber(id) {
  const value = Number(el(id)?.value);
  return Number.isFinite(value) ? Math.trunc(value) : 0;
}

function weekdayName(date) {
  return t(`dateCalc.weekday.${weekday(date)}`);
}

function put(id, value) {
  const target = el(id);
  if (target) target.value = value;
}

function renderAge() {
  const birth = readDate('dcBirth');
  const base = readDate('dcAgeBase', todayLocal());
  if (!birth) {
    ['dcMan', 'dcSe', 'dcYeon', 'dcLived', 'dcLivedDays', 'dcNextBirthday'].forEach((id) => put(id, ''));
    return null;
  }
  const diff = dateDiff(birth, base);
  if (diff.order === 'backward') {
    ['dcMan', 'dcSe', 'dcYeon', 'dcLived', 'dcLivedDays', 'dcNextBirthday'].forEach((id) => put(id, ''));
    return t('dateCalc.error.futureBirth');
  }

  const ages = koreanAges(birth, base);
  put('dcMan', t('dateCalc.unit.age', { value: ages.man }));
  put('dcSe', t('dateCalc.unit.age', { value: ages.se }));
  put('dcYeon', t('dateCalc.unit.age', { value: ages.yeon }));
  put('dcLived', t('dateCalc.unit.ymd', {
    years: diff.ymd.years,
    months: diff.ymd.months,
    days: diff.ymd.days,
  }));
  put('dcLivedDays', t('dateCalc.unit.days', { value: diff.days.toLocaleString() }));
  const until = daysUntilBirthday(birth, base);
  put('dcNextBirthday', until === 0
    ? t('dateCalc.age.birthdayToday')
    : t('dateCalc.unit.days', { value: until }));
  return null;
}

function renderDiff() {
  const from = readDate('dcFrom');
  const to = readDate('dcTo');
  const ids = ['dcDiffDays', 'dcDiffInclusive', 'dcDiffWeeks', 'dcDiffYmd', 'dcDiffWeekdays', 'dcDiffMonths'];
  if (!from || !to) {
    ids.forEach((id) => put(id, ''));
    return null;
  }
  const diff = dateDiff(from, to);
  put('dcDiffDays', t('dateCalc.unit.days', { value: diff.days.toLocaleString() }));
  put('dcDiffInclusive', t('dateCalc.unit.days', { value: diff.inclusiveDays.toLocaleString() }));
  put('dcDiffWeeks', t('dateCalc.unit.weeks', { weeks: diff.weeks, days: diff.weekRestDays }));
  put('dcDiffYmd', t('dateCalc.unit.ymd', {
    years: diff.ymd.years,
    months: diff.ymd.months,
    days: diff.ymd.days,
  }));
  put('dcDiffWeekdays', t('dateCalc.unit.days', { value: countWeekdays(from, to).toLocaleString() }));
  put('dcDiffMonths', t('dateCalc.unit.months', { value: diff.ymd.years * 12 + diff.ymd.months }));
  return null;
}

function renderDday() {
  const target = readDate('dcTarget');
  const base = readDate('dcDdayBase', todayLocal());
  const ids = ['dcDdayLabel', 'dcDdayDays', 'dcDdayCountUp', 'dcDdayWeekday'];
  if (!target) {
    ids.forEach((id) => put(id, ''));
    return null;
  }
  const result = dday(target, base);
  put('dcDdayLabel', result.label);
  put('dcDdayDays', t('dateCalc.unit.days', { value: Math.abs(result.days).toLocaleString() }));
  put('dcDdayCountUp', result.countUpDays === null
    ? '—'
    : t('dateCalc.unit.nthDay', { value: result.countUpDays.toLocaleString() }));
  put('dcDdayWeekday', weekdayName(target));
  return null;
}

function renderAdd() {
  const base = readDate('dcAddBase', todayLocal());
  const business = readNumber('dcAddBusiness');
  let result = addToDate(base, {
    years: readNumber('dcAddYears'),
    months: readNumber('dcAddMonths'),
    weeks: readNumber('dcAddWeeks'),
    days: readNumber('dcAddDays'),
  });
  if (business !== 0) {
    result = addBusinessDays(result, business);
  }
  put('dcAddResult', formatDate(result));
  put('dcAddWeekday', weekdayName(result));
  const fromToday = dateDiff(todayLocal(), result);
  put('dcAddFromToday', fromToday.order === 'backward'
    ? t('dateCalc.add.past', { value: fromToday.days.toLocaleString() })
    : t('dateCalc.unit.days', { value: fromToday.days.toLocaleString() }));
  return null;
}

function renderAll() {
  const errors = [renderAge(), renderDiff(), renderDday(), renderAdd()].filter(Boolean);
  if (errors.length) {
    setMessage(errors[0], true);
  } else {
    setMessage('');
  }
}

// 기본값: 생년월일은 비워 두고 나머지는 오늘/한 달 뒤로 채워 첫 화면이
// 빈 표가 아니게 한다.
function seedDefaults() {
  const today = todayLocal();
  const seed = (id, value) => {
    const node = el(id);
    if (node && !node.value) node.value = value;
  };
  seed('dcAgeBase', formatDate(today));
  seed('dcFrom', formatDate(today));
  seed('dcTo', formatDate(addToDate(today, { months: 1 })));
  seed('dcTarget', formatDate(addToDate(today, { days: 100 })));
  seed('dcDdayBase', formatDate(today));
  seed('dcAddBase', formatDate(today));
}

document.querySelectorAll('#tab-age input, #tab-diff input, #tab-dday input, #tab-add input')
  .forEach((input) => input.addEventListener('input', renderAll));

seedDefaults();
renderAll();
