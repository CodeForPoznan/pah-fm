<template>
  <div class="header">
    <a
      href="https://www.pah.org.pl/"
      target="_blank">
      <img
        class="logo"
        :src="logo" >
    </a>
    <nav class="menu">
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
    </nav>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import LoginStatus from './LoginStatus.vue';
import { PL, languages } from '../main';

export default {
  name: 'Header',
  components: {
    LoginStatus,
  },
  computed: {
    ...mapState(['user']),
    logo() {
      /* eslint-disable */
      return this._i18n.locale === languages[PL]
        ? require('../assets/logo_pl.svg')
        : require('../assets/logo_en.svg');
      /* eslint-enable */
    },
  },
  data() {
    return {
      links: this.navigation,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base';

.header {
  @include p(3);
  @include flex(row);

  text-align: center;
  background: $white;
  height: 315px;
}

.menu {
  @include media-breakpoint-down (sm) {
    display: none;
  }
}

.logo {
  color: #0072bc;
  max-width: 240px;
  max-height: 150px;
}
</style>
