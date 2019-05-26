/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updated() {
      console.log('SW updated.');
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
