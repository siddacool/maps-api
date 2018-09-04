import PublicPageContainer from '../containers/PublicPageContainer';

export default function () {
  const homeContainer = new PublicPageContainer();

  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = homeContainer.Render();
}
