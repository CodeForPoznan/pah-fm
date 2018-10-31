<template>
  <div id="app">
    <Header />

    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>

    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import store from './store';

export default {
  name: 'app',
  store,
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
