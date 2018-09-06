import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Component } from 'domr-framework';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <a href="#" class="btn btn--active">Login</a>
    `;
  }

  Events() {
    this.Click((self, e) => {
      e.preventDefault();
      const email = document.getElementById('login-page-email').value;
      const pwd = document.getElementById('login-page-pwd').value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pwd);

      promise
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
    });
  }
}
