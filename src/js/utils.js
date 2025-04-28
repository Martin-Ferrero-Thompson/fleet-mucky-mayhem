let daysItem = document.querySelector("#days");
let hoursItem = document.querySelector("#hours");
let minItem = document.querySelector("#min");
let secItem = document.querySelector("#sec");

let countDown = () => {
    let futureDate = new Date("2025-05-10T09:30:00");
    let currentDate = new Date();
    let myDate = futureDate - currentDate;
    console.log(myDate);
 
    let days = Math.floor(myDate / 1000 / 60 / 60 / 24);
 
    let hours = Math.floor(myDate / 1000 / 60 / 60) % 24;
 
    let min = Math.floor(myDate / 1000 / 60) % 60;
 
    let sec = Math.floor(myDate / 1000) % 60;
 
    daysItem.innerHTML = days;
    hoursItem.innerHTML = hours;
    minItem.innerHTML = min;
    secItem.innerHTML = sec;
  }
 
  countDown()
 
  setInterval(countDown, 1000)

  document.addEventListener('DOMContentLoaded', (event) => {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('darkModeSwitch');

    // Set the default theme to dark if no setting is found in local storage
    const currentTheme = localStorage.getItem('bsTheme') || 'dark';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    switchElement.checked = currentTheme === 'dark';

    switchElement.addEventListener('change', function () {
        if (this.checked) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('bsTheme', 'dark');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('bsTheme', 'light');
        }
    });
});
