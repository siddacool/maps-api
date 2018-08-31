import HomePageView from './views/HomePageView';
import AdminPageView from './views/AdminPageView';

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
];

export default routes;
