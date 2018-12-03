<template>
  <div class="header p-3">
    <Language />
    {{ logo }}
    <h1><a
      href="https://www.pah.org.pl/"
      target="_blank">{{ $t("header.polish_humanitarian_action") }}</a></h1>
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
import Language from './Language.vue';
import { PL, languages } from '../main';

export default {
  name: 'Header',
  components: {
    LoginStatus,
    Language,
  },
  computed: {
    ...mapState(['user']),
    logo() {
      return this._i18n.locale === languages[PL] ? require('../assets/logo_pl.svg') : require('../assets/logo_en.svg');
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
  background: $blue;
  text-align: center;

  @include respond-to(tablet) {
    background: $grey;
  }
}

.menu {
  @include media-breakpoint-down (md) {
    display: none;
  }
}
</style>
