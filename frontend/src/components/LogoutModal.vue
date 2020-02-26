<template>
  <b-modal
    id="logout-modal"
    :title="$t('common.are_you_sure')"
    :ok-title="$t('common.logout')"
    :cancel-title="$t('common.cancel')"
    ok-variant="danger"
    @ok="logout"
    class="logout-modal"
  >
    <p v-if="isOnline">
      {{ $t('logout.logout_warning') }}
    </p>
    <p v-else>
      {{ $t('logout.offline_logout_warning') }}
    </p>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';

import router from '../router';
import { logoutRoute } from '../router/routes';
import { IS_ONLINE } from '../store/constants';

export default {
  name: 'LogoutModal',
  computed: {
    ...mapState([IS_ONLINE]),
  },
  methods: {
    logout() {
      router.push(logoutRoute);
    },
  },
};
</script>

<style scoped>
.logout-modal {
  color: black;
}
</style>
