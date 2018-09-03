import { Component } from 'domr-framework';

import {
  saveCityData,
  saveCountryData,
} from '../utils/firebase-db-manipulation';

function saveCity() {
  const insert = document.querySelector('.info--create');
  const close = insert.querySelector('.close-btn');
  const nameField = insert.querySelector('.name');
  const name = nameField.value;
  const countryCodeField = insert.querySelector('.country-code');
  const countryCode = countryCodeField.value;
  const timezoneField = insert.querySelector('.timezone');
  const timezone = timezoneField.value;
  const areaField = insert.querySelector('.area');
  const area = areaField.value;
  const lat = insert.querySelector('.lat').querySelector('span').innerText;
  const lng = insert.querySelector('.lng').querySelector('span').innerText;

  if (name !== '' && countryCode !== '') {
    saveCityData({
      name,
      country_code: countryCode,
      lat,
      lng,
      timezone,
      area,
    }).then(() => {
      close.click();
    }).catch((err) => {
      console.log(err);
    });
  } else {
    nameField.parentElement.classList.add('txt--red');
    countryCodeField.parentElement.classList.add('txt--red');
  }

  setTimeout(() => {
    nameField.parentElement.classList.remove('txt--red');
    countryCodeField.parentElement.classList.remove('txt--red');
  }, 3000);
}

function saveCountry() {
  const insert = document.querySelector('.info--create');
  const close = insert.querySelector('.close-btn');
  const nameField = insert.querySelector('.name');
  const name = nameField.value;
  const countryCodeField = insert.querySelector('.country-code');
  const countryCode = countryCodeField.value;
  const lat = insert.querySelector('.lat').querySelector('span').innerText;
  const lng = insert.querySelector('.lng').querySelector('span').innerText;

  if (name !== '' && countryCode !== '') {
    saveCountryData({
      name,
      country_code: countryCode,
      lat,
      lng,
    }).then(() => {
      close.click();
    }).catch((err) => {
      console.log(err);
    });
  } else {
    nameField.parentElement.classList.add('txt--red');
    countryCodeField.parentElement.classList.add('txt--red');
  }

  setTimeout(() => {
    nameField.parentElement.classList.remove('txt--red');
    countryCodeField.parentElement.classList.remove('txt--red');
  }, 3000);
}

const save = [
  saveCity,
  saveCountry,
];

export default class extends Component {
  constructor(type = 'country') {
    super();
    this.type = type;
  }

  Markup() {
    return `
      <a href="#" class="btn btn--safe">Save ${this.type}</a>
    `;
  }

  Events() {
    const type = this.type;

    this.Click((self, e) => {
      e.preventDefault();
      const savePlace = type === 'city' ? save[0] : save[1];

      savePlace();
    });
  }
}
