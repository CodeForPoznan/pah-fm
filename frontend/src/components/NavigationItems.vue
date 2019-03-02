
<template>
  <b-nav
    fill
    class="menu-items">
    <b-nav-item
      v-for="link in links"
      :to="link.to"
      :key="link.text"
    >
      {{ link.text }}
    </b-nav-item>

    <b-nav-item
      @click="LOGOUT"
      to="/logout"
      key="logout"
      class="username"
    >
      {{ $t('common.logout') }}
      <p>
        {{ user.username }}
      </p>

      <a
        href="http://codeforpoznan.pl"
        target="_blank">
        <img
          class="footer-image"
          src="../assets/logo_codeforpoznan.svg"
        >
      </a>
      <a
        href="https://www.pah.org.pl"
        target="_blank">
        <img
          class="footer-image pah-logo"
          src="../assets/logo_en.svg"
        >
      </a>
    </b-nav-item>

  </b-nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as actions from '../store/actions';
import { USER } from '../store';

export default {
  name: 'NavigationItems',
  computed: {
    ...mapState([USER]),
  },
  methods: {
    ...mapActions([actions.LOGOUT]),
  },
  data() {
    return {
      links: this.navigation,
    };
  },

};
</script>

<style>
.bm-burger-button {
  right: 16px !important;
}
</style>

<style scoped lang="scss">
@import '../scss/base';

.menu-items {
  @include media-breakpoint-up (lg) {
    .nav-item.username {
      max-width: 400px;
      flex-grow: initial;
    }

    .nav-link {
      min-height: 100px;
      font-size: 20px;
      min-width: 155px;
      color: $white;
      display: flex;
      align-items: flex-end;
    }

    .nav-link:hover {
      padding-bottom: 12px;
      transition: 0.2s;
    }

    li:nth-child(1) {
      background: $pah-color-1;
    }

    li:nth-child(2) {
      background: $pah-color-2;
    }

    li:nth-child(3) {
      background: $pah-color-3;
    }

    li:nth-child(4) {
      background: $pah-color-4;
    }
  }
}

.login {
  @include my(4);
  margin: 0 auto;
  font-size: 14px;
  font-weight: 300;
}
</style>
