<template>
  <b-modal
    id="logout-modal"
    :title="$t('common.are_you_sure')"
    :okTitle="$t('common.logout')"
    :cancelTitle="$t('common.cancel')"
    @ok="logout"
    class="logout-modal"
  >
    <p>
      {{ $t('logout.offline_logout_warning') }}
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

<style scoped>
.logout-modal {
  color: black;
}
</style>
