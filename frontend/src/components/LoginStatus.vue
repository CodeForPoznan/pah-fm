<template>
    <div v-if="username">User: {{ username }}</div>
    <div v-else>
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
  };
</script>
