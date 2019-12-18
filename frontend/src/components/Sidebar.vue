<template>
  <ScaleRotate
    class="mobile-menu"
    v-if="show"
    right
  >
    <b-nav fill>
      <NavigationItems />
      <Language />

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

      <b-nav-item
        v-if="user"
        @click="LOGOUT"
        to="/logout"
        key="logout"
        class="username"
        :class="{ offline: !isOnline }"
      >
        {{ $t('common.logout') }}
        <p>{{ user.username }}</p>
      </b-nav-item>
    </b-nav>
  </ScaleRotate>
</template>

<script>
import { ScaleRotate } from 'vue-burger-menu';
import { mapActions, mapGetters, mapState } from 'vuex';

import { USER } from '../store';
import * as actions from '../store/actions';
import { IS_ONLINE } from '../store/constants';

import NavigationItems from './NavigationItems.vue';
import Language from './Language.vue';

export default {
  name: 'Sidebar',
  components: {
    ScaleRotate,
    NavigationItems,
    Language,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState([USER]),
    ...mapGetters([IS_ONLINE]),
  },
  methods: {
    ...mapActions([actions.LOGOUT]),
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

.offline {
  cursor: default;
  pointer-events: none;
  text-decoration: none;
}
</style>
