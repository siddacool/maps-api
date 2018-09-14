import { Component } from 'domr-framework';

import {
  updateCityData,
  updateCountryData,
} from '../utils/firebase-db-manipulation';

function updateCity() {
  const insert = document.querySelector('.info');
  const cityId = insert.getAttribute('data-db-id');
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
    updateCityData(cityId, {
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

function updateCountry() {
  const insert = document.querySelector('.info');
  const countryId = insert.getAttribute('data-db-id');
  const close = insert.querySelector('.close-btn');
  const nameField = insert.querySelector('.name');
  const name = nameField.value;
  const countryCodeField = insert.querySelector('.country-code');
  const countryCode = countryCodeField.value;
  const lat = insert.querySelector('.lat').querySelector('span').innerText;
  const lng = insert.querySelector('.lng').querySelector('span').innerText;
  const timezone = insert.querySelector('.timezone-multi');
  const timezoneValue = Array(...timezone.options).reduce((acc, option) => {
    if (option.selected === true) {
      acc.push(option.value);
    }
    return acc;
  }, []);

  if (name !== '' && countryCode !== '') {
    updateCountryData(countryId, {
      name,
      country_code: countryCode,
      lat,
      lng,
      timezone: timezoneValue,
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
  updateCity,
  updateCountry,
];

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <a href="#" class="btn btn--active">Save</a>
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
