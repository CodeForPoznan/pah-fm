<template>
  <div id="app">
    <Status />
    <Header />
    <div class="container page-container">
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

import { FETCH_ROUTES, FETCH_USER } from './store/actions';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Refresh from './components/Refresh.vue';
import Status from './components/Status.vue';

import store from './store';

export default {
  name: 'App',
  store,
  mounted() {
    this.$store.dispatch(FETCH_USER);
    this.$store.dispatch(FETCH_ROUTES);
  },
  components: {
    Refresh,
    Header,
    Footer,
    Status,
  },

};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.page-container {
  min-height: calc(100vh - 65px - 128px);
}
</style>
