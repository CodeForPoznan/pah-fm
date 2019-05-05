/* eslint-disable no-console */

import { register } from 'register-service-worker';

import store from './store';
import { SET_UPDATE_READY } from './store/mutations';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updated() {
      store.commit(SET_UPDATE_READY, true);
    },
    ready() {
      console.log('App is being served from cache by a service worker.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
