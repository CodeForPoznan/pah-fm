<template>
  <div class="header p-3">
    <h1><a href="https://www.pah.org.pl/">Polish Humanitarian Action</a></h1>
    <b-nav
      fill
      v-for="link in links"
      :key="link.text">
      <b-nav-item :to="link.to">{{ link.text }}</b-nav-item>
    </b-nav>
    <LoginStatus v-bind="user"/>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import LoginStatus from './LoginStatus.vue';

export default {
  name: 'Header',
  components: {
    LoginStatus,
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      links: [
        {
          text: 'Home',
          to: '/',
        },
        {
          text: 'Add new route',
          to: '/route/',
        },
        {
          text: 'Routes',
          to: '/routes/',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
    @import '../scss/variables';
    @import '../scss/mixins';

    .header {
        background: $blue;
        text-align: center;

        @include respond-to(tablet) {
            background: $grey;
        }
    }
</style>
