import { Component } from 'domr-framework';
import DateTime from 'luxon/src/datetime';
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
      </div>
      <div class="part part--area">
        <div class="area-group">
          <span class="title">Area</span>
        </div>
      ${
        city.area && city.area !== 0 ?
        `
          <div class="area-group">
            <span class="area">${city.area}</span>
            <span class="skm">km</span>
          </div>
        `
        :
        `
          <div class="area-group">
            <span class="area">-</span>
          </div>
        `
      }
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

    if (data.timezone && data.timezone !== '') {
      const timeToUpdate = DateTime.utc().setZone(`UTC${data.timezone}`).toFormat('hh:mm:ssa dd MMM');

      console.log(timeToUpdate);
    }

    return `
      <div class="info info--display">
        <div class="container">
          ${close.Render()}
          ${place}
        </div>
      </div>
    `;
  }

  AfterRenderDone() {
    const data = this.data;
    const type = this.type;
    const thisSelf = this.GetThisComponent();

    if (type === 'city' && data.timezone !== '') {
      function step() {
        const timeToUpdate = DateTime.utc().setZone(`UTC${data.timezone}`).toFormat('h:mm_a_MMMM d');
        const splitTime = timeToUpdate.split('_');

        if (thisSelf && thisSelf.querySelector('.part--timezone')) {
          const timezoneDom = thisSelf.querySelector('.part--timezone');
          timezoneDom.innerHTML = `
            <div class="time-group">
              <span class="time">${splitTime[0]}</span>
              <span class="a">${splitTime[1]}</span>
            </div>
            <div class="time-group">
              <span class="day">${splitTime[2]}</span>
            </div>
            <div class="time-group">
              <span class="timezone">GMT ${data.timezone}</span>
            </div>
          `;
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }
  }
}
