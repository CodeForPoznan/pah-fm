<template>
  <div id="app">
    <Status />
    <Header />
    <ScaleRotate
      class="mobile-menu"
      v-if="!isLogin"
      right>
      <NavigationItems />
    </ScaleRotate>
    <div
      id="page-wrap"
      class="container">
      <div class="row">
        <div class="col-xs-12 page">
          <transition
            name="fade"
            mode="out-in"
            appear>
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
    <Refresh />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ScaleRotate } from 'vue-burger-menu';

import Header from './components/Header.vue';
import Refresh from './components/Refresh.vue';
import Status from './components/Status.vue';
import store, { LANGUAGE } from './store';
import NavigationItems from './components/NavigationItems.vue';
import { loginRoute } from './router';
import { SYNC } from './store/constants';
import { FETCH_USER } from './store/actions';

export default {
  name: 'App',
  store,
  computed: {
    ...mapState([LANGUAGE]),
    isLogin() {
      return this.$router.currentRoute.path === loginRoute.path;
    },
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
    if (!this.isLogin) {
      this.sync();
      this.fetchUser();
    }
  },
  components: {
    Refresh,
    Header,
    Status,
    ScaleRotate,
    NavigationItems,
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
  .bm-menu {
    background: $pah-color-3;
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
</style>
