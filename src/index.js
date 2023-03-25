import './css/styles.css';

import _debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';

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
  const inputCountryName = event.target.value.trim();
  fetchCountries(inputCountryName)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (inputCountryName !== '') {
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
        country => `<li class = 'country'>
        <img src = '${country.flags.svg}'/>
        <p>${country.name}</p>
        </li>`
      )
      .join('');
    countryListEL.innerHTML;
  }
}

//функція, яка очищає весь список країн та очищає всі дані одної країни (картки)
function clearAll() {
  countryListEL.innerHTML = '';
  countryInfoDiv.innerHTML = '';
}
