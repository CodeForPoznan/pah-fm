<template>
  <scale-rotate
    class="mobile-menu"
    v-if="show"
    right
  >
    <b-nav fill>
      <navigation-items />
      <language wrap />

      <a
        class="out-link"
        href="http://codeforpoznan.pl"
        target="_blank"
      >
        <img
          class="out-link-image"
          src="../assets/logo_codeforpoznan.svg"
        >
      </a>
      <user-details />
    </b-nav>
  </scale-rotate>
</template>

<script>
import { ScaleRotate } from 'vue-burger-menu';

import UserDetails from './UserDetails.vue';
import NavigationItems from './NavigationItems.vue';
import Language from './Language.vue';

export default {
  name: 'Sidebar',
  components: {
    ScaleRotate,
    NavigationItems,
    Language,
    UserDetails,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.out-link {
  display: block;
  margin: 60px auto;
  width: 80px;
}

.out-link-image {
  width: 100%;
  height: 100%;
}
</style>
