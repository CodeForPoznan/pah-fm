<template>
  <div id="app">
    <Status />
    <Header />
    <ScaleRotate class="mobile-menu">
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
      </b-nav>

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
import { ScaleRotate } from 'vue-burger-menu';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Refresh from './components/Refresh.vue';
import Status from './components/Status.vue';

import store from './store';

export default {
  name: 'App',
  store,
  components: {
    Refresh,
    Header,
    Footer,
    Status,
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
}

.page-container {
  min-height: calc(100vh - 65px - 128px);
}

.mobile-menu {
  @include media-breakpoint-up (md) {
    display: none;
  }
}
</style>
