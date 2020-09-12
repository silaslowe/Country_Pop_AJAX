const min = document.querySelector(".min");
const max = document.querySelector(".max");
const btn = document.querySelector(".btn");
const output = document.querySelector(".output");
const radio = document.querySelectorAll('input[name="output-format"]');
const url = "https://restcountries.eu/rest/v2/all";
let num = "";
let countries = [];
let numbers = document.querySelectorAll(".number");
let countryCount = 0;
let formatSelection;

fetch(url)
  .then((res) => res.json())
  .then((data) => countries.push(...data))
  .catch((error) => console.log(error));

// Event Listeners

// Add Commas

btn.addEventListener("click", calculation);

// Click Event Callback

function calculation(e) {
  e.preventDefault();
  countryCount = 0;
  errorCheck();
  num1 = parseFloat(min.value.replace(/,/g, ""));
  num2 = parseFloat(max.value.replace(/,/g, ""));
  formatSelector(radio);
  if (formatSelection.value === "alphabetical") {
    alphabetical();
  }
  if (formatSelection.value === "ascending") {
    ascending();
  }
  console.log(radio);
  if (formatSelection.value === "descending") {
    descending();
  }
}

numbers.forEach((num) => num.addEventListener("transitionend", removeError));
// Transitonend Callback
function removeError() {
  this.classList.remove("errorMessage");
}

// Radio Button Selector

function formatSelector() {
  radio.forEach(function (selection) {
    if (selection.checked) {
      formatSelection = selection;
      console.log(formatSelection);
    }
  });
}

// Output functions

function alphabetical() {
  parametersCheck();

  let region = document.getElementById("region").value;

  let newArr = countries
    .filter(
      (country) =>
        country.population > num1 && country.population < num2 && country.region === region
    )
    .map(
      (namepop) =>
        `<li class="outputItem">${(countryCount += 1)}) ${namepop.name}: ${numberWithCommas(
          namepop.population
        )}</li>`
    )
    .join("");
  output.innerHTML = newArr;
}

function ascending() {
  parametersCheck();

  let region = document.getElementById("region").value;

  let newArr = countries
    .filter(
      (country) =>
        country.population > num1 && country.population < num2 && country.region === region
    )
    .sort((a, b) => a.population - b.population)
    .map(
      (namepop) =>
        `<li class="outputItem">${(countryCount += 1)}) ${namepop.name}: ${numberWithCommas(
          namepop.population
        )}</li>`
    )
    .join("");
  output.innerHTML = newArr;
}

function descending() {
  parametersCheck();

  let region = document.getElementById("region").value;

  let newArr = countries
    .filter(
      (country) =>
        country.population > num1 && country.population < num2 && country.region === region
    )
    .sort((a, b) => b.population - a.population)
    .map(
      (namepop) =>
        `<li class="outputItem">${(countryCount += 1)}) ${namepop.name}: ${numberWithCommas(
          namepop.population
        )}</li>`
    )
    .join("");
  output.innerHTML = newArr;
}

// Missing Input

function errorCheck() {
  if (!min.value && !max.value) {
    missingInput(min);
    missingInput(max);
  }
  if (!min.value) {
    missingInput(min);
  }
  if (!max.value) {
    missingInput(max);
  }
  return;
}

function missingInput(numberInput) {
  numberInput.classList.add("errorMessage");
}

// Min Larger Than Max Check

function parametersCheck() {
  if (num1 > num2) {
    missingInput(min);
    missingInput(max);
  }
}

// Output Numbers with Commas Function

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

numbers.forEach((num) => num.addEventListener("keyup", addCommas));

function addCommas() {
  console.log(this.value);
  this.value = this.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
