import { Home, Test, NoMatch } from './pages';

const Routes = [
  {
    path: '/',
    exact: true,
    main: Home,
    label: 'Home',
    icon: 'home',
  },
  {
    path: '/test',
    main: Test,
    label: 'Test saga',
    icon: 'local_pizza',
  },
  {
    path: '/test2',
    label: 'Empty page',
  },
  {
    main: NoMatch,
    label: 'Not found',
  },
];

export default Routes;
