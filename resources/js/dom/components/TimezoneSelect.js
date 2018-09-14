import { Component } from 'domr-framework';
import utcTimezones from '../utc-timezones';
import { findCountryByCountryCode } from '../utils/firebase-db-manipulation';

export default class extends Component {
  constructor(obj, name, placeholder) {
    super();
    this.obj = obj;
    this.name = name;
    this.placeholder = placeholder;
  }

  Markup() {
    const placeholder = this.placeholder;
    const name = this.name;

    return `
      <label for="${name}" class="txt txt--select">
        <select class="${name}" name="${name}" id="timezone-select">
          <option value="" disabled selected>${placeholder}</option>
        </select>
      </label>
    `;
  }

  AfterRenderDone() {
    const select = document.getElementById('timezone-select');
    const obj = this.obj;

    findCountryByCountryCode(obj.country_code)
    .then((findCountry) => {
      if (findCountry !== '' && findCountry.timezone && findCountry.timezone.length > 0) {
        const timezones = findCountry.timezone;

        if (timezones.length === 1) {
          select.innerHTML += `
            <option value="${timezones[0]}" selected>${timezones[0]}</option>
          `;
        } else {
          select.innerHTML += `
            ${timezones.map(tz => `
              <option value="${tz}" ${obj.timezone && obj.timezone === tz ? 'selected' : ''}>${tz}</option>
            `).join('')}
          `;
        }
      } else {
        select.innerHTML += `
          ${utcTimezones.map(tz => `
            <option value="${tz}" ${obj.timezone && obj.timezone === tz ? 'selected' : ''}>${tz}</option>
          `).join('')}
        `;
      }
    });
  }
}

