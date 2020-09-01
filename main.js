const min = document.querySelector(".min");
const max = document.querySelector(".max");
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
  // e.preventDefault();
  num1 = min.value;
  num2 = max.value;
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
  if (!min.value && !max.value) {
    missingInput(min);
    missingInput(max);
    return;
  }
  if (!min.value) {
    missingInput(min);
    return;
  }
  if (!max.value) {
    missingInput(max);
    return;
  }
}

function parametersCheck() {
  if (num1 > num2) {
    missingInput(min);
    missingInput(max);
  }
}

// Removes green boarder, adds red error border

function missingInput(numberInput) {
  numberInput.classList.remove("number");
  numberInput.classList.add("errorbtn");
}

// Resets the Green border

function reset() {
  min.classList.remove("errorbtn");
  max.classList.remove("errorbtn");
  min.classList.add("number");
  max.classList.add("number");
}

// Adds commas to output Numbers

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function errorCheck2() {
//   if (!min.value && !max.value) {
//     min.classList.remove("number");
//     min.classList.add("errorbtn");
//     max.classList.remove("number");
//     max.classList.add("errorbtn");
//     return;
//   }
//   if (!min.value) {
//     min.classList.remove("number");
//     min.classList.add("errorbtn");
//     return;
//   }
//   if (!max.value) {
//     max.classList.remove("number");
//     max.classList.add("errorbtn");
//     return;
//   }
// }
