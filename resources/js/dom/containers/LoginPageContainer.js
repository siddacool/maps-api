import { Component } from 'domr-framework';
import LoginBtn from '../components/LoginBtn';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    const loginBtn = new LoginBtn();

    return `
      <div class="login">
        <input id="login-page-email" type="text" placeholder="Username"/>
        <input id="login-page-pwd" type="password" placeholder="Password"/>
        ${loginBtn.Render()}
      </div>
    `;
  }
}
