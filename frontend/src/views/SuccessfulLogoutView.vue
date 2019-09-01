<template>
  <div class="container">
    <h1>{{ $t('logout.thank_you') }}</h1>
    <p>{{ $t('logout.successfully_logged_out') }}</p>
    <a href="/login">{{ $t('logout.login_again') }}</a>
  </div>
</template>

<script>
export default {
  name: 'SuccessfulLogoutView',
};
</script>

<style scoped>
.container {
  margin: 0 15px;
}
</style>
