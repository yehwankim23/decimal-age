const html = document.documentElement;
const viewport = document.getElementById("viewport");
const container = document.getElementById("container");

function resize() {
  let width = html.clientWidth * 0.999;
  let height = html.clientHeight * 0.999;

  viewport.setAttribute("style", `width: ${width}px; height: ${height}px;`);
  viewport.width = width;
  viewport.height = height;

  if (width < height) {
    height = width * 1.333;
  } else {
    width = height * 0.75;
  }

  container.setAttribute("style", `width: ${width}px; height: ${height}px;`);
  container.width = width;
  container.height = height;
}

resize();

window.addEventListener("resize", () => resize());

const birthday = document.getElementById("birthday");
const age = document.getElementById("age");

function getTotalDays(year) {
  return year % 400 == 0 ? 366 : year % 100 == 0 ? 365 : year % 4 == 0 ? 366 : 365;
}

function getDayNumber(year, month, day) {
  switch (month) {
    case 12:
      day += 30;
    case 11:
      day += 31;
    case 10:
      day += 30;
    case 9:
      day += 31;
    case 8:
      day += 31;
    case 7:
      day += 30;
    case 6:
      day += 31;
    case 5:
      day += 30;
    case 4:
      day += 31;
    case 3:
      day += getTotalDays(year) == 365 ? 28 : 29;
    case 2:
      day += 31;
  }

  return day;
}

function calculate() {
  let input = birthday.value;
  let birthdayYear = parseInt(input.slice(0, 4));

  let today = new Date();
  today = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() +
      getTotalDays(birthdayYear) -
      getDayNumber(birthdayYear, parseInt(input.slice(5, 7)), parseInt(input.slice(8, 10)))
  );
  let todayYear = today.getFullYear();

  age.innerText = `You are ${
    todayYear -
    birthdayYear -
    1 +
    (getDayNumber(todayYear, today.getMonth() + 1, today.getDate()) / getTotalDays(todayYear))
      .toString()
      .slice(1, 3)
  } years old.`;
}

calculate();
