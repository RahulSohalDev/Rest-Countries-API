const darkMode = document.querySelector(".Dark-Mode");
const toggal = document.querySelector(".toggal");
const countryEl = document.querySelector(".grid");
const openEl = document.querySelector(".model");
// const opendiv = document.querySelector(".open");

//...........theme toggal...........
toggal.addEventListener("click", () => {
  darkMode.classList.toggle("Dark-Mode");
});

//...........calll API.....................
async function getCountry() {
  let url = null,
    res = [];
  try {
    url = await fetch("https://restcountries.com/v2/all");
    res = await url.json();
  } catch (err) {
    alert("Unable to load data");
    console.log(err);
  }

  res.forEach((element) => {
    showCountry(element);
  });
}

getCountry();

function showCountry(data) {
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
  const country = document.createElement("li");
  country.classList.add("country");
  country.innerHTML = `
  <div class="img">
  <img src=" ${data.flag}" alt="" />
  </div>
  <div class="detail">
  <h4 class="regionName">${data.name}</h4>
  <p><strong>Popolation :</strong> ${data.population}</p>
  <p class="regions"><strong>Region :</strong> ${data.region}</p>
  <p><strong>Capital :</strong> ${data.capital}</p>
  </div>
  `;
  countryEl.appendChild(country);

  country.addEventListener("click", () => {
    openEl.style.display = "flex";
    countryDetails(data);
  });
}

function countryDetails(data) {
  openEl.innerHTML = `  <button class="close">Back</button>
  <div class="container">
  <img src="${data.flag}" alt="" />
  <div class="more-info">
  <h4 class="regionName">${data.name}</h4>
  <p><strong>Popolation :</strong> ${data.population}</p>
  <p><strong>Region :</strong> ${data.region}</p>
  <p><strong>Capital :</strong> ${data.capital}</p>
  <p><strong>Native Name :</strong> ${data.nativeName}</p>
  <p><strong>Currencies
  :</strong> ${data.currencies.map((currency) => currency.code)}</p>
  <p><strong>Language :</strong> ${data.languages.map(
    (language) => language.name
  )}</p>
  <p><strong>Area :</strong> ${data.area}</p>
  
  </div>
  </div>`;
  const closebtn = document.querySelector(".close");
  closebtn.addEventListener("click", () => {
    openEl.style.display = "none";
  });
}

// ...........search method................
const search = document.querySelector(".input");

search.addEventListener("input", (e) => {
  const regionName = document.querySelectorAll(".regionName");
  const errorBox = document.querySelector(".error-box");

  regionName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });

  let countOfFlags = 0;
  regionName.forEach((region) => {
    if (region.parentElement.parentElement.style.display == "block") {
      countOfFlags += 1;
    }
  });
  if (!countOfFlags) {
    errorBox.classList.add("open");
  } else {
    errorBox.classList.remove("open");
  }
});

//.........Filter Method..........
const optionbg = document.querySelector("#option-bg");

optionbg.addEventListener("change", (e) => {
  const value = e.target.value;
  const regions = document.querySelectorAll(".regions");
  regions.forEach((region) => {
    if (region.innerText.includes(value)) {
      region.parentElement.parentElement.style.display = "block";
    } else if (value === "All") {
      region.parentElement.parentElement.style.display = "block";
    } else {
      region.parentElement.parentElement.style.display = "none";
    }
  });
});
