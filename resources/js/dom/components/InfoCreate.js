import { Component } from 'domr-framework';
import SelectBtn from './InfoSelectBtn';
import Close from './InfoCloseBtn';
import FormCity from './FormCity';
import FormCountry from './FormCountry';
import InfoSave from './InfoSave';

const Form = [
  FormCity,
  FormCountry,
];

export default class extends Component {
  constructor(lat, lng, type = 'country') {
    super();
    this.lat = lat;
    this.lng = lng;
    this.type = type;
  }

  Markup() {
    const type = this.type;
    const lat = this.lat;
    const lng = this.lng;
    const city = new SelectBtn('city', type === 'city');
    const country = new SelectBtn('country', type === 'country');
    const close = new Close();
    const thisForm = type === 'city' ? Form[0] : Form[1];
    const form = thisForm(lat, lng);
    const infoSave = new InfoSave(type);

    return `
      <div class="info info--create">
        <div class="container">
          ${close.Render()}
          <div class="info__head" data-lat="${lat}" data-lng="${lng}">
            <div class="info__head__title">Create Marker</div>
            ${city.Render()}
            ${country.Render()}
            ${infoSave.Render()}
          </div>
          <div class="info__body">
            ${form}
          </div>
        </div>
      </div>
    `;
  }
}
