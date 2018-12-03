<template>
  <div id="app">
    <Status />
    <Header />
    <Language class="language"/>
    <ScaleRotate
      class="mobile-menu"
      right>
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
          to="/logout"
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
      <Language class="language-mobile"/>

    </ScaleRotate>
    <div
      id="page-wrap"
      class="container page-container page-wrap">
      <div class="row">
        <div class="col-sm-12">
          <transition
            name="fade"
            mode="out-in"
            appear>
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
    <Footer />
    <Refresh />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ScaleRotate } from 'vue-burger-menu';

import Language from './components/Language.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Refresh from './components/Refresh.vue';
import Status from './components/Status.vue';

import store from './store';

export default {
  name: 'App',
  store,
  computed: {
    ...mapState(['user']),
  },
  components: {
    Refresh,
    Header,
    Footer,
    Status,
    Language,
    ScaleRotate,
  },
  data() {
    return {
      links: this.navigation,
    };
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
}

.page-container {
  min-height: calc(100vh - #{$footer-height} - #{$header-height});

  @include media-breakpoint-down (sm) {
    min-height: calc(100vh - #{$footer-height-mobile} - #{$header-height-mobile});
  }
}

.language {
  @include media-breakpoint-down (sm) {
    display: none;
  }

  position: absolute;
  right: 1em;
  top: 1em;
}

.language-mobile {
  display: flex;
  margin-top: 50px;

  & .lang {
    margin: 0 auto;
    padding: 0 !important;

    & li {
      padding: 10px;
      margin: 0;
    }
  }
}

.bm-item-list {
  margin-right: 10%;
  margin-left: 10%;
}

.mobile-menu {
  @include media-breakpoint-up (md) {
    display: none;
  }

  .bm-menu {
    background: $pah-color-3;
  }

  & .nav-item a {
    color: $white;
  }

  & .nav-item a:hover {
    text-decoration: underline;
  }

  & .username {
    font-size: 0.75em;
  }
}
</style>
