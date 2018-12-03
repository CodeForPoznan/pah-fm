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
          v-for="link in links"
          :to="link.to"
          :key="link.text"
        >
          {{ link.text }}
        </b-nav-item>

        <b-nav-item
          v-if="user"
          to="/login"
          key="logout"
          class="username"
        >
          {{ $t('login.user', { username: user.username }) }}
        </b-nav-item>

        <b-nav-item
          v-else
          to="/login"
          key="login"
        >
          {{ $t('common.login') }}
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

  & .nav {
    & .nav-item {
      max-width: 200px;
    }

    & .nav-item.username {
      max-width: 400px;
      flex-grow: initial;
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
      background: $pah-color-1;
    }

    & > li:nth-child(2) {
      background: $pah-color-2;
    }

    & > li:nth-child(3) {
      background: $pah-color-3;
    }

    & > li:nth-child(4) {
      background: $pah-color-4;
    }
  }
}

.logo-container {
  flex: 1;
}

.logo {
  color: #0072bc;
  max-width: 240px;
  max-height: 150px;

  @include media-breakpoint-down (sm) {
    max-width: 180px;
    max-height: 125px;
  }
}
</style>
