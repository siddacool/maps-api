import { Component } from 'domr-framework';
import LogoutBtn from '../components/LogoutBtn';
import MapAdmin from '../components/MapAdmin';
import InfoCreate from '../components/InfoCreate';

export default class extends Component {
  constructor(l) {
    super();
    this.l = l;
  }

  Markup() {
    const logoutBtn = new LogoutBtn();
    const mapAdmin = new MapAdmin();
    const infoEdit = InfoCreate('city');

    return `
      <div class="home home--admin">
        ${logoutBtn.Render()}
        ${mapAdmin.Render()}
        ${infoEdit}
      </div>
    `;
  }
}
