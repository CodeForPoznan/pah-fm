<template>
    <div v-if="username">User: {{ username }}</div>
    <div v-else-if="!isLoginpage">
        <b-link to="/login">Log in</b-link>
    </div>
</template>

<script>
export default {
  name: 'LoginStatus',
  props: {
    id: Number,
    username: String,
  },
  computed: {
    isLoginpage() {
      return this.$route.name === 'Login';
    },
  },
};
</script>
