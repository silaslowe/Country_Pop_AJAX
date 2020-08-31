const number = document.querySelector(".number");
const btn = document.querySelector(".btn");
const output = document.querySelector(".output");
let num = "";
const url = "https://restcountries.eu/rest/v2/all";
let countries = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => countries.push(...data))
  .catch((error) => console.log(error));

btn.addEventListener("click", numFunc);

function numFunc(e, num) {
  e.preventDefault();
  num = number.value;
  let region = document.getElementById("region").value;
  let newArr = countries
    .filter((country) => country.population > num && country.region === region)
    .map(
      (namepop) =>
        `<li class="outputItem">${namepop.name}: ${numberWithCommas(namepop.population)}</li>`
    )
    .join("");
  output.innerHTML = newArr;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
