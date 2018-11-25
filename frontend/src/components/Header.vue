<template>
  <div class="header p-3">
    <h1><a href="https://www.pah.org.pl/">{{ $t("header.polish_humanitarian_action") }}</a></h1>
    <b-nav
      fill
    >
      <b-nav-item
        v-for="link in links"
        :to="link.to"
        :key="link.text"
      >
        {{ link.text }}
      </b-nav-item>
      <LoginStatus v-bind="user"/>
    </b-nav>

  </div>
</template>

<script>

import { mapState } from 'vuex';
import LoginStatus from './LoginStatus.vue';
import { USER } from '../store/constants';

export default {
  name: 'Header',
  components: {
    LoginStatus,
  },
  data() {
    return {
      links: [
        {
          text: this.$t('common.home'),
          to: '/',
        },
        {
          text: this.$t('common.new_route'),
          to: '/route/',
        },
        {
          text: this.$t('common.routes'),
          to: '/routes/',
        },
      ],
    };
  },
  computed: {
    user: function() {
      return this.$store.state[USER].data;
    },
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
