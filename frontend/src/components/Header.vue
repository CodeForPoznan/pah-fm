<template>
  <div class="header col-6">
    <b-link
      class="logo-container"
      to="/drive"
    >
      <img
        class="logo"
        :src="logo"
      >
    </b-link>
  </div>
</template>

<script>
import { PL, languages } from '../services/lang';

export default {
  name: 'Header',
  computed: {
    logo() {
      /* eslint-disable */
      return this._i18n.locale === languages[PL]
        ? require('../assets/logo_pl.svg')
        : require('../assets/logo_en.svg');
      /* eslint-enable */
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base';

.header {
  @include p(3);
  @include flex(row, center);

  justify-content: flex-start;
  text-align: center;
  background: $white;
  height: 120px;
}

.logo-container {
  @include mr(3);

  flex: 1;
  max-width: 240px;
  max-height: 150px;
  list-style-type: none;

  @include media-breakpoint-down(md) {
    float: right;
    justify-content: flex-start;
    max-width: 180px;
    max-height: 125px;
    margin: 0 auto;
  }
}

.logo {
  width: 100%;
}
</style>
