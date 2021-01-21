import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

const routes = [
    {
      path: '/login',
      component: Login,
      isPrivate: false,
    },
    {
      path: '/',
      component: Home,
      isPrivate: true,
    },
    {
      path: '/*',
    //   component: NotFound,
      isPrivate: true,
    },
  ];

  export default routes;
