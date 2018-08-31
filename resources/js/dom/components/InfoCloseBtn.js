import { Component } from 'domr-framework';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <a href="#" class="close-btn">
        <svg role="img" class="icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-iconmonstr-x-mark-6"></use>
        </svg>
      </a>
    `;
  }

  Events() {
    this.Click((self, e) => {
      e.preventDefault();
      const info = self.parentElement.parentElement;
      const grandParent = info.parentElement;

      grandParent.removeChild(info);
    });
  }
}

