import iterate from '../utils/iterate-data';
import CountrySelect from './CountrySelect';
import CityTimezoneSelect from './TimezoneSelect';

function makeTextbox(data, name, placeholder) {
  const modName = name.replace(/-/g, '_');
  return `
    <label for="${name}" class="txt txt--drop">
      <input type="text" class="${name}" name="${name}" 
        placeholder="${placeholder}" 
        value="${iterate(data, modName)}"
      />
      <span>${placeholder}</span>
    </label>
  `;
}

function makeFixed(data, name, value) {
  return `
    <div class="fixed-fields ${name}"><b>${name}</b><span>${data && data[name] ? data[name] : value}</span></div>
  `;
}

export default function (lat, lng, data = {}) {
  const cityName = makeTextbox(data, 'name', 'City Name');
  const countryCode = new CountrySelect(data, 'country-code', 'Country Name');
  const lati = makeFixed(data, 'lat', lat);
  const lngi = makeFixed(data, 'lng', lng);
  const timezone = new CityTimezoneSelect(data, 'timezone', 'Pick a Timezone');
  const area = makeTextbox(data, 'area', 'Area');

  return `
    <div class="info__form info__form--city" data-type="city" data-id="${iterate(data, 'city_id')}">
      ${cityName}
      ${countryCode.Render()}
      ${lati}
      ${lngi}
      <div class="gap"></div>
      ${timezone.Render()}
      ${area}
      <label class="checkbox">
        <input type="checkbox" name="isCapital" value="isCapital" class="isCapital" 
          ${iterate(data, 'isCapital') ? 'checked' : ''}
        /> Capital City
      </label>
    </div>
  `;
}
