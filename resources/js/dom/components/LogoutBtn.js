import firebase from 'firebase';
import { Component } from 'domr-framework';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <a href="#" id="admin-page-logout" class="admin-logout btn btn--active">Logout</a>
    `;
  }

  Events() {
    this.Click((self, e) => {
      firebase.auth().signOut();
      location.reload();
    });
  }
}
