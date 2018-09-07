import { Component } from 'domr-framework';
import SelectBtn from './InfoSelectBtn';
import Close from './InfoCloseBtn';
import FormCity from './FormCity';
import FormCountry from './FormCountry';
import InfoSave from './InfoSaveBtn';

const Form = [
  FormCity,
  FormCountry,
];

export default class extends Component {
  constructor(lat, lng, type = 'country', data = {}) {
    super();
    this.lat = lat;
    this.lng = lng;
    this.type = type;
    this.data = data;
  }

  Markup() {
    const type = this.type;
    const lat = this.lat;
    const lng = this.lng;
    const data = this.data;
    const city = new SelectBtn('city', type === 'city');
    const country = new SelectBtn('country', type === 'country');
    const close = new Close();
    const thisForm = type === 'city' ? Form[0] : Form[1];
    const form = thisForm(lat, lng, data);
    const infoSave = new InfoSave();

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
