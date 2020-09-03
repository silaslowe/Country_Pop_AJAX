const min = document.querySelector(".min");
const max = document.querySelector(".max");
const btn = document.querySelector(".btn");
const output = document.querySelector(".output");
let num = "";
const url = "https://restcountries.eu/rest/v2/all";
let countries = [];
let numbers = document.querySelectorAll(".number");
let countryCount = 0;

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
  num1 = parseFloat(min.value.replace(/,/g, ""));
  num2 = parseFloat(max.value.replace(/,/g, ""));
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
        `<li class="outputItem">${(countryCount += 1)}) ${namepop.name}: ${numberWithCommas(
          namepop.population
        )}</li>`
    )
    .join("");
  output.innerHTML = newArr;
}

numbers.forEach((num) => num.addEventListener("transitionend", removeError));
// Transitonend Callback
function removeError() {
  this.classList.remove("errorMessage");
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

numbers.forEach((num) => num.addEventListener("keydown", addCommas));

function addCommas() {
  console.log(this.value);
  this.value = this.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
