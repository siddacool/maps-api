import { Component } from 'domr-framework';

import {
  saveCityData,
  saveCountryData,
} from '../utils/firebase-db-manipulation';

function saveCity() {
  const insert = document.querySelector('.info');
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
  const isCapital = insert.querySelector('.isCapital').checked;

  if (name !== '' && countryCode !== '') {
    saveCityData({
      name,
      country_code: countryCode,
      lat,
      lng,
      timezone,
      area,
      isCapital,
    }).then(() => {
      close.click();
    }).catch((err) => {
      console.log(err);
    });
  } else {
    if (name.trim() === '') {
      nameField.parentElement.classList.add('txt--red');
    }

    if (countryCode.trim() === '') {
      countryCodeField.parentElement.classList.add('txt--red');
    }
  }

  setTimeout(() => {
    nameField.parentElement.classList.remove('txt--red');
    countryCodeField.parentElement.classList.remove('txt--red');
  }, 3000);
}

function saveCountry() {
  const insert = document.querySelector('.info');
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
    if (name.trim() === '') {
      nameField.parentElement.classList.add('txt--red');
    }

    if (countryCode.trim() === '') {
      countryCodeField.parentElement.classList.add('txt--red');
    }
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
  constructor() {
    super();
  }

  Markup() {
    return `
      <a href="#" class="btn btn--safe">
        <svg role="img" class="icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-iconmonstr-check-mark-10"></use>
        </svg>
      </a>
    `;
  }

  Events() {
    this.Click((self, e) => {
      e.preventDefault();
      const form = document.querySelector('.info__form').getAttribute('data-type');
      const savePlace = form === 'city' ? save[0] : save[1];

      savePlace();
    });
  }
}
