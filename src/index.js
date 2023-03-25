import './css/styles.css';

import _debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
//доступ до елемнтів input
const inputEl = document.querySelector('#search-box');
const countryListEL = document.querySelector('country-list');
const countryInfoDiv = document.querySelector('country-info');

//додаємо обробніка подій на інпут
inputEl.addEventListener('input', _debounce(onSearch, DEBOUNCE_DELAY));

//опрацьовуємо отримане значення з інпуту
function onSearch(event) {
  event.preventDefault();
  const inputCountryName = inputEl.value.trim();
  fetchCountries(inputCountryName)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (inputCountryName !== '') {
        //можна зробити окремі функціі на сповіщення
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}
function countriesData(data) {
  if (data.length > 10) {
    clearAll();
    //можна зробити окремі функціі на сповіщення
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearAll();
    return data
      .map(
        country => `<li class = "country">
        <img src = "${country.flags.svg}"/>
        <p class = "country-name">${country.name.official}</p>
        </li>`
      )
      .join('');
    countryListEL.innerHTML;
  } else clearAll();
  return data.map(
    country =>
      `<div class = "country-card">
    <img  class = "country-flag" src = "${country.flags.svg}" alt = "${country.name.official} flag"
    <p class = "country-name">${country.name.official}</p>
    <p class= "capital-name">${country.capital}</p>
    <p class = "population">${country.population}</p>
    <p class = "language">${language}</p>
    </div>`
  );
}

//функція, яка очищає весь список країн та очищає всі дані одної країни (картки)
function clearAll() {
  countryListEL.innerHTML = '';
  countryInfoDiv.innerHTML = '';
}
