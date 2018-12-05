<template>
  <div class="header">
    <a
      class="logo-container"
      href="https://www.pah.org.pl/"
      target="_blank">
      <img
        class="logo"
        :src="logo"
      >
    </a>
    <nav class="menu">
      <NavigationItems />
    </nav>
  </div>
</template>

<script>
import { PL, languages } from '../main';
import NavigationItems from './NavigationItems.vue';

export default {
  name: 'Header',
  components: {
    NavigationItems,
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'Login';
    },
    logo() {
      /* eslint-disable */
      return this._i18n.locale === languages[PL]
        ? require('../assets/logo_pl.svg')
        : require('../assets/logo_en.svg');
      /* eslint-enable */
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base';

.header {
  @include p(3);
  @include flex(row, center);

  text-align: center;
  background: $white;
  height: $header-height;

  @include media-breakpoint-down (sm) {
    height: $header-height-mobile;
  }
}

.menu {
  flex: 2;
  padding-bottom: 20px;

  @include media-breakpoint-down (sm) {
    display: none;
  }
}

.logo-container {
  flex: 1;
  max-width: 240px;
  max-height: 150px;

  @include mr(3);

  @include media-breakpoint-down (sm) {
    max-width: 180px;
    max-height: 125px;
    margin: 0 auto;
  }
}

.logo {
  width: 100%;
}
</style>
