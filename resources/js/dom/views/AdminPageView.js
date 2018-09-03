import firebase from 'firebase/app';
import 'firebase/auth';
import LoginPageContainer from '../containers/LoginPageContainer';
import AdminPageContainer from '../containers/AdminPageContainer';
import config from '../../../../config.env';

export default function () {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  let homeContainer = '';

  firebase.auth().onAuthStateChanged((fireUser) => {
    if (fireUser) {
      homeContainer = new AdminPageContainer();
    } else {
      homeContainer = new LoginPageContainer();
    }

    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = homeContainer.Render();
  });
}
