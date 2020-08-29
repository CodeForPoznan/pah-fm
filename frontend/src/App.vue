<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <Header />
        <Status />
        <div class="col-3 menu-button">
          <sidebar :show="showMenu && IS_USER_LOGGED_IN" />
        </div>
      </div>
      <div
        id="page-wrap"
        class="container"
      >
        <div class="row">
          <div class="col-xs-12 page">
            <transition
              name="fade"
              mode="out-in"
              appear
            >
              <router-view @hide-menu="showMenu = false" />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <Refresh />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import Header from './components/Header.vue';
import Refresh from './components/Refresh.vue';
import Status from './components/Status.vue';
import Sidebar from './components/Sidebar.vue';
import store, { LANGUAGE } from './store';

import { IS_USER_LOGGED_IN } from './store/modules/http/getters';

import { SYNC } from './store/constants';
import { FETCH_USER } from './store/actions';

export default {
  name: 'App',
  store,
  components: {
    Refresh,
    Header,
    Status,
    Sidebar,
  },
  data() {
    return {
      showMenu: true,
    };
  },
  computed: {
    ...mapState([LANGUAGE]),
    ...mapGetters('http', [IS_USER_LOGGED_IN]),
  },
  methods: {
    ...mapActions({
      sync: SYNC,
      fetchUser: FETCH_USER,
    }),
  },
  created() {
    if (this.language) {
      /* eslint-disable-next-line no-underscore-dangle */
      this._i18n.locale = this.language;
    }
    if (this[IS_USER_LOGGED_IN]) {
      this.sync();
      this.fetchUser();
    }
  },
};
</script>

<style lang="scss">
  @import './scss/base';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: $white;
    min-height: 100vh;
  }

  .bm-item-list {
    margin-right: 10%;
    margin-left: 10%;
  }

  .nav {
    flex-wrap: nowrap;
  }

  .mobile-menu {
    position: inherit;

    .bm-menu {
      background: $pah-color-3;
    }

    .bm-burger-button {
      position: inherit;
      width: 42px;
      height: 36px;
      cursor: pointer;
    }

    .bm-burger-bars {
      background-color: #373a47;
    }

    .bm-cross {
      height: 30px !important;
    }

    .cross-style {
      top: 36px !important;
      right: 36px !important;
    }

    & .nav-item a {
      color: $white;
    }

    & .nav-item a:hover {
      text-decoration: underline;
    }

    & .nav {
      flex-direction: column;
    }

    & .username {
      font-size: 0.75em;
    }
  }

  .is-invalid {
    border-color: red !important;
  }

  .page {
    width: 100%;
  }

  .row {
    display: flex;
    justify-items: center;
    align-items: center;
    min-height: 15vh;
  }

  .menu-button {
    display: flex;
    justify-content: center;
  }
</style>
