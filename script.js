const today = document.querySelector("#today");

const date = new Date();
date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
today.value = date.toISOString().slice(0, 10);

function getPercent(id) {
  const values = document.querySelector(`#${id}`).value.split("-");
  const year = parseInt(values[0]);
  const month = parseInt(values[1]);
  let day = parseInt(values[2]);

  const days = year % 400 === 0 ? 366 : year % 100 === 0 ? 365 : year % 4 === 0 ? 366 : 365;

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
      day += days === 365 ? 28 : 29;
    case 2:
      day += 31;
  }

  return day / days;
}

function setInputBackgroundColor(id) {
  document.querySelector(`#${id}-container`).style.backgroundColor = `hsl(${
    360 * getPercent(id)
  }, 75%, 75%)`;
}

const birthday = document.querySelector("#birthday");

function setResult() {
  let birthdayValues = birthday.value.split("-");
  let birthdayYear = parseInt(birthdayValues[0]);
  let birthdayMonth = parseInt(birthdayValues[1]);
  let birthdayDay = parseInt(birthdayValues[2]);

  let todayValues = today.value.split("-");
  let todayYear = parseInt(todayValues[0]);
  let todayMonth = parseInt(todayValues[1]);
  let todayDay = parseInt(todayValues[2]);

  const result = document.querySelector("#result");

  if (
    todayYear < birthdayYear ||
    (todayYear === birthdayYear && todayMonth < birthdayMonth) ||
    (todayYear === birthdayYear && todayMonth === birthdayMonth && todayDay < birthdayDay)
  ) {
    result.style.backgroundColor = "#888";
    result.innerText = "You are negative years old";
    return;
  }

  const age = todayYear - birthdayYear + getPercent("today") - getPercent("birthday");
  const integer = Math.trunc(age);
  const decimal = age - integer;

  result.style.backgroundColor = `hsl(${360 * decimal}, 75%, 75%)`;

  result.innerText = `You are ${integer + decimal.toString().slice(1, 4)} ${
    age === 1 ? "year" : "years"
  } old`;
}

[birthday, today].forEach((input) => {
  input.addEventListener("change", () => {
    setInputBackgroundColor(input.id);
    setResult();
  });

  setInputBackgroundColor(input.id);
});

setResult();
