<template>
  <div class="header">
    <a
      class="logo-container"
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
          v-for="(link, key) in links"
          :id="key"
          :to="link.to"
          :key="link.text"
        >
          {{ link.text }}
        </b-nav-item>
        <b-nav-item
          id="links.length + 1"
          to="/login"
          key="login"
        >
          <span
            v-if="username"
          >
            {{ $t('login.user', { username: username }) }}
          </span>
          <span v-else>
            {{ $t('common.login') }}
          </span>
        </b-nav-item>
      </b-nav>
    </nav>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { PL, languages } from '../main';

export default {
  name: 'Header',
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['user']),
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
  @include flex(row, center);

  text-align: center;
  background: $white;
  height: 250px;
}

.menu {
  flex: 2;
  padding-bottom: 20px;

  @include media-breakpoint-down (sm) {
    display: none;
  }

  & .nav {
    & .nav-item {
      max-width: 200px;
    }

    & > li > a {
      min-height: 100px;
      font-size: 20px;
      min-width: 155px;
      color: $white;
      display: flex;
      align-items: flex-end;
    }

    & > li:nth-child(1) {
      background: #0072bc;
    }

    & > li:nth-child(2) {
      background: #1980c3;
    }

    & > li:nth-child(3) {
      background: #338ec9;
    }

    & > li:nth-child(4) {
      background: #ec1818;
    }
  }
}

.logo-container{
  flex: 1;
}

.logo {
  color: #0072bc;
  max-width: 240px;
  max-height: 150px;
}

</style>
