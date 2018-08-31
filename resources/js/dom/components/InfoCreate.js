import SelectBtn from './InfoSelectBtn';
import Close from './InfoCloseBtn';
import FormCity from './FormCity';

export default function (lat, lng, data, type = 'city') {
  const city = new SelectBtn('city', type === 'city');
  const country = new SelectBtn('country', type === 'country');
  const close = new Close();
  const formCity = FormCity(lat, lng, data);

  return `
    <div class="info info--create">
      <div class="container">
        ${close.Render()}
        <div class="info__head" data-lat="${lat}" data-lng="${lng}">
          <div class="info__head__title">Create Marker</div>
          ${city.Render()}
          ${country.Render()}
        </div>
        <div class="info__body">
          ${formCity}
        </div>
      </div>
    </div>
  `;
}
