let countdownInterval;

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const daysElement = document.querySelector(".countdown-clock-days");
  const hoursElement = document.querySelector(".countdown-clock-hours");
  const minutesElement = document.querySelector(".countdown-clock-minutes");
  const secondsElement = document.querySelector(".countdown-clock-seconds");

  if (distance < 0) {
    clearInterval(countdownInterval);
    if (daysElement) daysElement.textContent = "00";
    if (hoursElement) hoursElement.textContent = "00";
    if (minutesElement) minutesElement.textContent = "00";
    if (secondsElement) secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
  if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
  if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
  if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
}

function displayTargetDate(targetDate, locale) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(targetDate);

  const rideDateElement = document.querySelector(".ride-date");
  if (rideDateElement) rideDateElement.textContent = formattedDate;
}

const targetDate = new Date("2025-08-09T08:30:00");
const locale = "en-GB";

updateCountdown(targetDate.getTime());
displayTargetDate(targetDate, locale);
countdownInterval = setInterval(() => updateCountdown(targetDate.getTime()), 1000);
