<template>
  <div
    class="footer p-3"
    :class="{ 'full-screen': isLogin }">
    <h3 class="heading"><a href="http://codeforpoznan.pl">Code for Poznan</a></h3>
  </div>
</template>

<script>
import { LOGIN_PATH } from '../router/constants';

export default {
  name: 'Footer',
  data() {
    return {
      isLogin: this.$router.currentRoute.path === LOGIN_PATH,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.heading {
  margin: 0;

  @include media-breakpoint-down (sm) {
    font-size: 1rem;
  }
}

.footer {
  background: $grey;
}

.footer.full-screen {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
