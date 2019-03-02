
<template>
  <b-nav fill >
    <b-nav-item
      v-for="link in links"
      :to="link.to"
      :key="link.text"
    >
      {{ link.text }}
    </b-nav-item>

    <b-nav-item
      @click="LOGOUT"
      to="/logout"
      key="logout"
      class="username"
    >
      {{ $t('common.logout') }}
      <p>
        {{ user.username }}
      </p>

      <Language />

      <a
        class="out-link"
        href="http://codeforpoznan.pl"
        target="_blank">
        <img
          class="out-link-image"
          src="../assets/logo_codeforpoznan.svg"
        >
      </a>

    </b-nav-item>

  </b-nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as actions from '../store/actions';
import { USER } from '../store';
import Language from './Language.vue';

export default {
  name: 'NavigationItems',
  components: {
    Language,
  },
  computed: {
    ...mapState([USER]),
  },
  methods: {
    ...mapActions([actions.LOGOUT]),
  },
  data() {
    return {
      links: this.navigation,
    };
  },

};
</script>

<style>
.bm-burger-button {
  right: 16px !important;
}
</style>

<style scoped lang="scss">
@import '../scss/base';

.login {
  @include my(4);
  margin: 0 auto;
  font-size: 14px;
  font-weight: 300;
}

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
