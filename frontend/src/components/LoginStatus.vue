<template>
  <div
    v-if="!isLoginPage"
    class="login-status"
  >
    <div
      v-if="username"
    >
      User: {{ username }}
    </div>
    <div v-else>
      <b-link to="/login">Log in</b-link>
    </div>
  </div>

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

