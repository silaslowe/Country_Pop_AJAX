const number1 = document.querySelector(".number1");
const number2 = document.querySelector(".number2");
const btn = document.querySelector(".btn");
const output = document.querySelector(".output");
let num = "";
const url = "https://restcountries.eu/rest/v2/all";
let countries = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => countries.push(...data))
  .catch((error) => console.log(error));

btn.addEventListener("click", calculation);

function calculation(e) {
  e.preventDefault();
  num1 = number1.value;
  num2 = number2.value;
  reset();
  errorCheck();
  parametersCheck();

  let region = document.getElementById("region").value;
  let newArr = countries
    .filter(
      (country) =>
        country.population > num1 && country.population < num2 && country.region === region
    )
    .map(
      (namepop) =>
        `<li class="outputItem">${namepop.name}: ${numberWithCommas(namepop.population)}</li>`
    )
    .join("");
  output.innerHTML = newArr;
}

// Error Check Functions

function errorCheck() {
  if (!number1.value && !number2.value) {
    missingInput(number1);
    missingInput(number2);
    return;
  }
  if (!number1.value) {
    missingInput(number1);
    return;
  }
  if (!number2.value) {
    missingInput(number2);
    return;
  }
}

function parametersCheck() {
  if (num1 > num2) {
    missingInput(number1);
    missingInput(number2);
  }
}

// Removes green boarder, adds red error border

function missingInput(numberInput) {
  numberInput.classList.remove("number");
  numberInput.classList.add("errorbtn");
}

// Resets the Green border

function reset() {
  number1.classList.remove("errorbtn");
  number2.classList.remove("errorbtn");
  number1.classList.add("number");
  number2.classList.add("number");
}

// Adds commas to output Numbers

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function errorCheck2() {
//   if (!number1.value && !number2.value) {
//     number1.classList.remove("number");
//     number1.classList.add("errorbtn");
//     number2.classList.remove("number");
//     number2.classList.add("errorbtn");
//     return;
//   }
//   if (!number1.value) {
//     number1.classList.remove("number");
//     number1.classList.add("errorbtn");
//     return;
//   }
//   if (!number2.value) {
//     number2.classList.remove("number");
//     number2.classList.add("errorbtn");
//     return;
//   }
// }
