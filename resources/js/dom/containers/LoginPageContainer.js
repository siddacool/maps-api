import { Component } from 'domr-framework';
import MapPublic from '../components/MapPublic';
import LoginBtn from '../components/LoginBtn';

const config = {
  locate: true,
  locate_pop: false,
};

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    const mapPublic = new MapPublic(config);
    const loginBtn = new LoginBtn();

    return `
      <div class="home home--login">
        <div class="login">
          <div class="login__heading">
            <a href="#/" class="image">
              <img src="favicon/favicon.png" alt="Pin" />
            </a>
            <span class="heading1">Purple Maps</span>
            <span class="heading2">Login</span>
          </div>
          <div class="login--modal">
            <div class="container">
              <label for="username" class="txt txt--drop">
                <input id="login-page-email" type="text" name="username" placeholder="Username"/>
                <span>Username</span>
              </label>
              <label for="username" class="txt txt--drop">
                <input id="login-page-pwd" type="password" name="password" placeholder="Password"/>
                <span>Password</span>
              </label>
              ${loginBtn.Render()}
            </div>
          </div>
        </div>
        ${mapPublic.Render()}
      </div>
    `;
  }
}
