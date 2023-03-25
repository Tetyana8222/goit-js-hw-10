import './css/styles.css';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
//доступ до елемнтів input
const inputEl = document.querySelector('#search-box');
const countryListEL = document.querySelector('.country-list');
const countryInfoDiv = document.querySelector('.country-info');

//додаємо обробника подій на інпут
inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

//опрацьовуємо отримане значення з інпуту
function onSearch(event) {
  let inputCountryName = event.target.value.trim();
  fetchCountries(inputCountryName).then(countries => {
    console.log(countries);
    if (countries.length > 10) {
      clearAll();
      NeedSpecificNameNotification();
    }
    if (countries.length > 1 && countries.length <= 10) {
      clearAll();
      countriesListLayOut(countries);
    }
    if (countries.length === 1) {
      clearAll();
      countriesCard(countries);
    }
    if (countries.length === 0) {
      clearAll();
      showNoMatchNotification();
    }
  });
}
//--------------------------------------
function countriesListLayOut(countries) {
  let markup = countries
    .map(
      country =>
        `<div class = "country-card">
    <img  class = "country-flag" width="80"
    src = "${country.flags.svg}"
     alt = "${country.name.official} flag" />
    <p class = "country-name">Country: ${country.name.official}</p>
    <p class= "capital-name">Capital: ${country.capital}</p>
    <p class = "population">Population: ${country.population}</p>
    <p class = "language">Language: ${Object.values(country.languages)}</p>
    </div>`
    )
    .join('');
  countryListEL.innerHTML = markup;
}
//------------------------------
function countriesCard(countries) {
  let countryInfo = countries
    .map(
      country =>
        `<li class = "country">
     <img  class = "country-flag" width="80"
    src = "${country.flags.svg}"
     alt = "${country.name.official} flag" />
      <p class = "country-name">Country: ${country.name.official}</p>
      </li>`
    )
    .join('');
  countryInfoDiv.innerHTML = countryInfo;
}
//     .map(
//       country => `<li class = "country">
//       <img src = "${country.flags.svg}"/>
//       <p class = "country-name">${country.name.official}</p>
//       </li>`
//     )
//     .join('');
//   countryListEL.innerHTML;
// } else clearAll();
// return countries

function showNoMatchNotification() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function NeedSpecificNameNotification() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
//функція, яка очищає весь список країн та очищає всі дані одної країни (картки)
function clearAll() {
  countryListEL.innerHTML = '';
  countryInfoDiv.innerHTML = '';
}
