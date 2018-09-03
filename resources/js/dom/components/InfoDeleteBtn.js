import { Component } from 'domr-framework';

import {
  deleteCityData,
  deleteCountryData,
} from '../utils/firebase-db-manipulation';

function deleteCity() {
  const insert = document.querySelector('.info');
  const cityId = insert.getAttribute('data-db-id');
  const close = insert.querySelector('.close-btn');

  deleteCityData(cityId).then(() => {
    close.click();
  }).catch((err) => {
    console.log(err);
  });
}

function deleteCountry() {
  const insert = document.querySelector('.info');
  const countryId = insert.getAttribute('data-db-id');
  const close = insert.querySelector('.close-btn');

  deleteCountryData(countryId).then(() => {
    close.click();
  }).catch((err) => {
    console.log(err);
  });
}

const save = [
  deleteCity,
  deleteCountry,
];

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <a href="#" class="btn btn--danger">Delete</a>
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
