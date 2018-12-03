<template>
  <div
    v-if="!isLoginPage"
    class="login-status"
  />

</template>

<script>
export default {
  name: 'LoginStatus',
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'Login';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base';

.login-status {
  @include py(2);
}
</style>

