import { DateTime } from './luxon.js';

const displayDate = () => {
  const dateElement = document.querySelector('.date');

  const now = DateTime.now();
  const yearHourMinSecOption = {
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const monthDayOption = { month: 'long', day: 'numeric' };
  const monthDay = now.setLocale('en-US').toLocaleString(monthDayOption);
  const yearHourMinSec = now.setLocale('en-US').toLocaleString(yearHourMinSecOption);
  dateElement.textContent = `${monthDay}th  ${yearHourMinSec}`;
};

export default displayDate;