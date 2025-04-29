// Set target date (August 9, 2025 08:30:00)
const targetDate = new Date(2025, 7, 9, 8, 30, 0).getTime();

// Update the countdown every second
let countdownInterval = setInterval(() => {
  updateCountdown(targetDate);
}, 1000);

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

// Format and display the target date
const rideDateElement = document.querySelector(".ride-date");
if (rideDateElement) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(targetDate));
  rideDateElement.textContent = formattedDate;
}

// Initial update
updateCountdown(targetDate);
