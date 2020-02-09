<template>
  <div class="logout">
    <h1>{{ $t('logout.thank_you') }}</h1>
    <p>{{ $t('logout.successfully_logged_out') }}</p>
    <router-link to="/login">
      {{ $t('logout.login_again') }}
    </router-link>
  </div>
</template>

<script>
import store from '../store';
import { LOGOUT } from '../store/actions';
import { SET_LOGOUT_PROGRESS } from '../store/mutations';

export default {
  name: 'SuccessfulLogoutView',
  mounted() {
    this.$emit('hide-menu');
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(LOGOUT);
    next();
  },
};
</script>

<style scoped>
.logout {
  text-align: center;
}
</style>
