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
export default {
  name: 'SuccessfulLogoutView',
  mounted() {
    this.$emit('hide-menu');
  },
};
</script>

<style scoped>
.logout {
  text-align: center;
}
</style>
