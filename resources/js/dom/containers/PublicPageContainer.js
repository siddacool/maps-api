import { Component } from 'domr-framework';
import MapPublic from '../components/MapPublic';

const config = {
  locate: true,
  locate_pop: true,
};

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    const mapPublic = new MapPublic(config);

    return `
      <div class="home home--public">
        <a href="#/api" id="public-page-api" class="public-api btn btn--active">API</a>
        ${mapPublic.Render()}
      </div>
    `;
  }
}
