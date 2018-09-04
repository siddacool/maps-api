import { Component } from 'domr-framework';
import Close from './InfoCloseBtn';

function cityData(city) {
  return `
    <div class="info__body">
      <div class="part part--head">
        <div class="place-title">${city.name} </div>
        ${city.isCapital ?
            '<span class="city-is-capital">Capital of</span>'
            : ''
          }
        <span class="city-country-code">${city.country_code}</span>
      </div>
      <div class="part part--timezone">
        Timezone
      </div>
      <div class="part part--area">
        Area
      </div>
    </div>
  `;
}

function countryData(country) {
  return `
    <div class="info__body">
      <div class="part part--head">
        <div class="place-title">${country.name}</div>
        <span class="country-code">(${country.country_code})</span>
      </div>
    </div>
  `;
}

const info = [
  cityData,
  countryData,
];

export default class extends Component {
  constructor(data) {
    super();
    this.data = data;
    this.type = this.data.city_id ? 'city' : 'country';
  }

  Markup() {
    const data = this.data;
    const type = this.type;
    const close = new Close();
    const placeToselect = type === 'city' ? info[0] : info[1];
    const place = placeToselect(data);

    return `
      <div class="info info--display">
        <div class="container">
          ${close.Render()}
          ${place}
        </div>
      </div>
    `;
  }
}
