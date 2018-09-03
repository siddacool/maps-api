import { Component } from 'domr-framework';
import iterate from '../utils/iterate-data';
import { getAllCountries } from '../utils/firebase-db-manipulation';

/*${iterate(data, modName)}*/

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
        <select class="${name}" name="${name}" id="country-code-select">
          <option value="" disabled selected>${placeholder}</option>
        </select>
      </label>
    `;
  }

  AfterRenderDone() {
    const select = document.getElementById('country-code-select');
    const obj = this.obj;
    const value = iterate(obj, this.name.replace(/-/g, '_'));

    getAllCountries()
    .then((data) => {
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      sortedData.forEach((country) => {
        const thisCountry = country;
        const id = thisCountry.country_id;
        const name = thisCountry.name;
        const code = thisCountry.country_code;

        select.innerHTML += `
          <option value="${code}" data-id="${id}" ${code === value ? 'selected' : ''}>${name} (${code})</option>
        `;
      });
    });
  }
}

