import { Component } from 'domr-framework';
import LogoutBtn from '../components/LogoutBtn';
import MapAdmin from '../components/MapAdmin';

export default class extends Component {
  constructor(l) {
    super();
    this.l = l;
  }

  Markup() {
    const logoutBtn = new LogoutBtn();
    const mapAdmin = new MapAdmin();

    return `
      <div class="home home--admin">
        ${logoutBtn.Render()}
        ${mapAdmin.Render()}
      </div>
    `;
  }
}
