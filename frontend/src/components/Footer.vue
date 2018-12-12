<template>
  <div
    class="footer p-3"
    :class="{ 'full-screen': isLogin }">
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

.footer {
  @include flex(row);
  @include p(1);

  height: $footer-height-mobile;
  background: $pah-color-1;

  @include media-breakpoint-up (lg) {
    height: $footer-height;
  }
}

.footer-image {
  max-height: 100%;
}

.pah-logo {
  @include p(2);

  background: $white;
}

.footer.full-screen {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
