import { Component } from 'domr-framework';
import FormCity from './FormCity';
import FormCountry from './FormCountry';

const forms = [
  FormCity,
  FormCountry,
];

export default class extends Component {
  constructor(name = 'city', isActive = false) {
    super();
    this.name = name;
    this.isActive = isActive;
  }

  Markup() {
    return `
      <a href="#" class="btn ${this.isActive ? 'btn--active' : ''}" data-id="${this.name}">
        ${this.name}
      </a>
    `;
  }

  Events() {
    const name = this.name;

    this.Click((self, e) => {
      e.preventDefault();
      const parent = self.parentElement;
      const container = parent.parentElement;
      const formBody = container.querySelector('.info__body');
      const lat = parent.getAttribute('data-lat');
      const lng = parent.getAttribute('data-lng');
      const SelectForm = forms[`${name === 'city' ? 0 : 1}`];
      const activeForm = SelectForm(lat, lng);
      const otherButton = parent.querySelector(`[data-id="${name === 'city' ? 'country' : 'city'}"]`);

      otherButton.classList.remove('btn--active');
      self.classList.add('btn--active');

      formBody.innerHTML = activeForm;
    });
  }
}

