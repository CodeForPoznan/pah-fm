<template>
  <b-modal
    id="logout-modal"
    title="Are you sure?"
    @ok="logout"
  >
    <p>
      You are offline so if you log out you will no able to log in again until
      you will be online again
    </p>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

import router from '../router';
import { LOGOUT } from '../store/actions';

export default {
  name: 'LogoutModal',
  methods: {
    ...mapActions([LOGOUT]),
    logout() {
      this.LOGOUT(router);
    },
  },
};
</script>
