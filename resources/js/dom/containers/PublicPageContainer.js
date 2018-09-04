import { Component } from 'domr-framework';
import MapPublic from '../components/MapPublic';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    const mapPublic = new MapPublic();

    return `
      <div class="home home--public">
        ${mapPublic.Render()}
      </div>
    `;
  }
}
