<template>
  <div
    class="footer p-3"
    :class="{ 'full-screen': isLogin }"/>
</template>

<script>
import { loginRoute } from '../router';

export default {
  name: 'Footer',
  data() {
    return {
      isLogin: this.$router.currentRoute.path === loginRoute.path,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.footer {
  @include flex(row);
  @include p(1);
  @include mt(3);

  height: 60px;
  background: $pah-color-1;
  width: 100%;
}

.footer-image {
  max-height: 100%;
}

.pah-logo {
  @include p(2);

  background: $white;
}

.footer.full-screen {
  width: 100%;
  bottom: 0;
}
</style>
