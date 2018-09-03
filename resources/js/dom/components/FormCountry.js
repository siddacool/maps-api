import iterate from '../utils/iterate-data';

function makeTextbox(data, name, placeholder) {
  return `
    <label for="${name}" class="txt txt--drop">
      <input type="text" class="${name}" name="${name}" 
        placeholder="${placeholder}" 
        value="${iterate(data, name)}"
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

  return `
    <div class="info__form info__form--city" data-type="country" data-id="${iterate(data, 'country_id')}">
     ${countryName}
     ${countryCode}
     ${lati}
     ${lngi}
    </div>
  `;
}
