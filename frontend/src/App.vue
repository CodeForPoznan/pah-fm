<template>
  <div id="app">
    <Status />
    <Header />
      <LoginStatus v-bind="user"/>

      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>

    <Footer />
    <Refresh />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Refresh from './components/Refresh.vue';
import LoginStatus from './components/LoginStatus.vue';
import Status from './components/Status.vue';

import store from './store';

export default {
  name: 'app',
  store,
  components: {
    Refresh,
    Header,
    Footer,
    LoginStatus,
    Status,
  },
  computed: {
    ...mapState(['user']),
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
</style>
