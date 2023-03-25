import './css/styles.css';

import _debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
//доступ до елемнтів input
const inputEl = document.querySelector('#search-box');
const countryListEL = document.querySelector('.country-list');
const countryInfoDiv = document.querySelector('.country-info');

//додаємо обробніка подій на інпут
inputEl.addEventListener('input', _debounce(onSearch, DEBOUNCE_DELAY));

//опрацьовуємо отримане значення з інпуту
function onSearch(event) {
  event.preventDefault();
  const inputCountryName = inputEl.value.trim();
  fetchCountries(inputCountryName)
    .then(countries => {
      countriesData(countries);
    })
    .catch(error => {
      if (inputCountryName !== '') {
        showNoMatchNotification();
      }
    });
}
function countriesData(countries) {
  if (countries.length > 10) {
    clearAll();

    NeedSpecificNameNotification;
  } else if (countries.length > 1 && countries.length <= 10) {
    clearAll();
    return countries
      .map(
        country => `<li class = "country">
        <img src = "${country.flags.svg}"/>
        <p class = "country-name">${country.name.official}</p>
        </li>`
      )
      .join('');
    countryListEL.innerHTML;
  } else clearAll();
  return countries
    .map(
      country =>
        `<div class = "country-card">
    <img  class = "country-flag" src = "${country.flags.svg}" alt = "${
          country.name.official
        } flag"
    <p class = "country-name">${country.name.official}</p>
    <p class= "capital-name">${country.capital}</p>
    <p class = "population">${country.population}</p>
    <p class = "language">${Object.values(languages)}</p>
    </div>`
    )
    .join('');
  countryInfoDiv.innerHTML;
}

//функція, яка очищає весь список країн та очищає всі дані одної країни (картки)
function showNoMatchNotification() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function NeedSpecificNameNotification() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function clearAll() {
  countryListEL.innerHTML = '';
  countryInfoDiv.innerHTML = '';
}
