// import "./request";
// import "./update";
import "../css/style.css";

const countriesHTML = document.getElementById("countries");
const countryName = document.getElementById("name");
const capitalName = document.getElementById("byCapital");
const regionName = document.getElementById("regionSelect");
const loader = document.getElementById("modal");

const API = "https://restcountries.com/v3.1/all";
let data = [];

const getData = async (source) => {
 const src = await fetch(source);
 data = await src.json();

 loader.classList.add("hidden");

 return data;
};

const loadData = async (val) => {
 if (val.length > 0) {
  countriesHTML.innerHTML = "";
  await val.forEach((country) => {
   countriesHTML.innerHTML += `
     <div
    class="rounded-lg shadow-lg border-2 p-4 hover:shadow-xl transition bg-neutral-200 max-w-xs"
    id="countries"
   >
    <img src="${country.flags.svg}"/>


    <div class="cord-body pl-2 w-md">
     <h1 class="my-2 text-4xl name" id="country_name">
     ${country.name.common}
     </h1>

     <h3 class="text-2xl mb-2">
      Capital:
      <span class="font-thin capital">
      ${country.capital}
      </span>
     </h3>

     <h3 class="text-2xl mb-2">
      Population:
      <span class="font-thin">
      ${country.population} people
      </span>
     </h3>

     <h3 class="text-2xl mb-2">
      Area:
      <span class="font-thin">
      ${country.area} km<sup>2</sup>
      </span>
     </h3>

     <h3 class="text-2xl">
      Region:
      <span class="font-thin region">
      ${country.region}
      </span>
     </h3>
    </div>
   </div>
  `;
  });
 } else {
  countriesHTML.innerHTML = `
  <h1 class="text-5xl text-center absolute text-green-600 top-1/2">
  Something went wrong!
  </h1>`;
 }
};

getData(API)
 .then((data) => {
  loadData(data);
 })
 .catch((err) => {
  console.error("Xatolik: ", err);
 });

regionName.addEventListener("change", () => {
 const region = document.querySelectorAll(".region");

 console.log(regionName.value.toLowerCase());

 Array.from(region).forEach((name) => {
  if (name.innerText.includes(regionName.value)) {
   name.parentElement.parentElement.parentElement.classList.remove("hidden");
  } else {
   name.parentElement.parentElement.parentElement.classList.add("hidden");
  }
 });
});

capitalName.addEventListener("input", () => {
 const capitals = document.querySelectorAll(".capital");

 Array.from(capitals).forEach((name) => {
  if (name.innerText.toLowerCase().includes(capitalName.value.toLowerCase())) {
   name.parentElement.parentElement.parentElement.classList.remove("hidden");
  } else {
   name.parentElement.parentElement.parentElement.classList.add("hidden");
  }
 });
});

countryName.addEventListener("input", () => {
 const names = document.querySelectorAll(".name");

 console.log(names[0].innerText);
 Array.from(names).forEach((name) => {
  if (name.innerText.toLowerCase().includes(countryName.value.toLowerCase())) {
   name.parentElement.parentElement.classList.remove("hidden");
  } else {
   name.parentElement.parentElement.classList.add("hidden");
  }
 });
});
