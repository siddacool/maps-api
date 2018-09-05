import ApiPageContainer from '../containers/ApiPageContainer';

export default function () {
  const apiPageContainer = new ApiPageContainer();

  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = apiPageContainer.Render();
}
