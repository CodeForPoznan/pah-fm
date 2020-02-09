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
    <p>
      {{ $t('logout.offline_logout_warning') }}
    </p>
  </b-modal>
</template>

<script>
import router from '../router';
import { logoutRoute } from '../router/routes';

export default {
  name: 'LogoutModal',
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
