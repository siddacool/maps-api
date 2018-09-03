import { Component } from 'domr-framework';
import Close from './InfoCloseBtn';
import FormCity from './FormCity';
import FormCountry from './FormCountry';
import InfoUpdate from './InfoUpdateBtn';
import InfoDelete from './InfoDeleteBtn';

const Form = [
  FormCity,
  FormCountry,
];

export default class extends Component {
  constructor(data = {}) {
    super();
    this.data = data;
  }

  Markup() {
    const data = this.data;
    let type = '';

    if (data.city_id) {
      type = 'city';
    } else if (data.country_id) {
      type = 'country';
    }
    const lat = data.lat;
    const lng = data.lng;
    const close = new Close();
    const thisForm = type === 'city' ? Form[0] : Form[1];
    const form = thisForm(lat, lng, data);
    const infoUpdate = new InfoUpdate();
    const infoDelete = new InfoDelete();

    return `
      <div class="info info--edit" data-db-id="${data[`${type}_id`]}">
        <div class="container">
          ${close.Render()}
          <div class="info__head" data-lat="${lat}" data-lng="${lng}">
            <div class="info__head__title">Edit Marker</div>
            ${infoUpdate.Render()}
            ${infoDelete.Render()}
          </div>
          <div class="info__body">
            ${form}
          </div>
        </div>
      </div>
    `;
  }
}
