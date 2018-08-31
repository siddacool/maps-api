import PublicPageContainer from '../containers/PublicPageContainer';
import config from '../../../../config.env';
import env from '../env-finder';

export default function () {
  const api = env === 'local' ? config.api.city_local : config.api.city;
  const homeContainer = new PublicPageContainer(L, api);

  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = homeContainer.Render();
}
