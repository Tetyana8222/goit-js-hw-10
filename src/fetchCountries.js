const URL = 'https://restcountries.com/v3.1/name';
const SEARCH_FIELDS = '?fields=name,capital,population,flags,languages';
//функція, що робить HTTP-запить і повертає проміс з масивом
export default function fetchCountries(name) {
  return fetch(`${URL}/${name}${SEARCH_FIELDS}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
