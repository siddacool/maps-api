import utcTimezones from '../utc-timezones';
import iterate from '../utils/iterate-data';

function makeTimezoneMulti(data, placeholder) {
  let selectArr = [];
  const startArr = [];
  const endArr = [];

  utcTimezones.forEach((tz) => {
    const thisTz = tz;
    const findMatch = data && data.timezone && data.timezone.length > 0 ?
                      data.timezone.filter(d => d === thisTz)
                      : [];

    selectArr.push({
      timezone: thisTz,
      isSelected: findMatch.length > 0,
    });
  });

  selectArr.forEach((s) => {
    if (s.isSelected) {
      startArr.push(s);
    } else {
      endArr.push(s);
    }
  });

  selectArr = startArr.concat(endArr);

  return `
    <label for="timezone-multi" class="txt txt--select txt--select--multi">
      <select class="timezone-multi" name="timezone-multi" id="timezone-select-multi" multiple>
        <option value="" disabled>${placeholder}</option>
        ${selectArr.map(tz => `
          <option value="${tz.timezone}" ${tz.isSelected ? 'selected="selected"' : ''}>${tz.timezone}</option>
        `).join('')}
      </select>
    </label>
  `;
}

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
  const countryName = makeTextbox(data, 'name', 'Country Name');
  const countryCode = makeTextbox(data, 'country-code', 'Country Code');
  const lati = makeFixed(data, 'lat', lat);
  const lngi = makeFixed(data, 'lng', lng);
  const timezones = makeTimezoneMulti(data, 'Pick a Timezone');

  return `
    <div class="info__form info__form--city" data-type="country" data-id="${iterate(data, 'country_id')}">
     ${countryName}
     ${countryCode}
     ${lati}
     ${lngi}
     ${timezones}
    </div>
  `;
}
