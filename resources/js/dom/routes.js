import HomePageView from './views/HomePageView';
import AdminPageView from './views/AdminPageView';
import ApiView from './views/ApiView';

const routes = [
  {
    path: '/',
    view: HomePageView,
    title: 'homepage',
    isDefault: true,
  },
  {
    path: '/admin',
    view: AdminPageView,
    title: 'admin',
  },
  {
    path: '/api',
    view: ApiView,
    title: 'api',
  },
];

export default routes;
