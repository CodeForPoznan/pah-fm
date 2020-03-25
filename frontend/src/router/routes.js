import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DriveFormView from '../views/DriveFormView.vue';
import DrivesView from '../views/DrivesView.vue';
import SuccessfulLogoutView from '../views/SuccessfulLogoutView.vue';
import PassengerView from '../views/PassengerView.vue';
import PassengerSubmitView from '../views/PassengerSubmitView.vue';
import DriveVerifyView from '../views/DriveVerifyView.vue';

export const loginRoute = {
  path: '/login',
  name: 'Login',
  component: LoginView,
};
export const driveCreateRoute = {
  path: '/drive',
  name: 'Drive',
  component: DriveFormView,
};
export const driveVerifyRoute = {
  path: '/verify',
  name: 'Verify',
  component: DriveVerifyView,
};
export const driveListRoute = {
  path: '/drives',
  name: 'Drives',
  component: DrivesView,
};
export const passengerRoute = {
  path: '/passenger',
  name: 'Passenger',
  component: PassengerView,
};
export const passengerSubmitRoute = {
  path: '/confirm',
  name: 'Confirm',
  component: PassengerSubmitView,
};
export const homeRoute = {
  path: '/',
  name: 'Home',
  component: HomeView,
};
export const logoutRoute = {
  path: '/logout',
  name: 'Logout',
  component: SuccessfulLogoutView,
};
export const pageNotFoundRoute = {
  path: '*',
  name: 'PageNotFound',
  component: HomeView,
  props: { pageNotFound: true },
};
export const groupBasedRoutes = {
  driver: [
    {
      text: 'common.new_drive',
      to: driveCreateRoute,
      visibleOnMenu: true,
    },
    {
      text: 'common.drives',
      to: driveListRoute,
      visibleOnMenu: true,
    },
    {
      text: '',
      to: driveVerifyRoute,
      visibleOnMenu: false,
    },
  ],
  passenger: [
    {
      text: 'common.confirm_drive',
      to: passengerRoute,
      visibleOnMenu: true,
    },
    {
      text: '',
      to: passengerSubmitRoute,
      visibleOnMenu: false,
    },
  ],
};

export const allGroupBasedRoutes = [
  ...groupBasedRoutes.driver,
  ...groupBasedRoutes.passenger,
].map(route => route.to.name);

export const openRoutes = [loginRoute.name];

export default [
  loginRoute,
  driveCreateRoute,
  driveListRoute,
  passengerRoute,
  passengerSubmitRoute,
  homeRoute,
  pageNotFoundRoute,
  logoutRoute,
  driveVerifyRoute,
];
