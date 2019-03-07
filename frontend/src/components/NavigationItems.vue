
<template>
  <b-nav fill >
    <b-nav-item
      v-for="link in links"
      :to="link.to"
      :key="link.text"
    >
      {{ link.text }}
    </b-nav-item>

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

    </b-nav-item>
  </b-nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as actions from '../store/actions';
import { USER } from '../store';
import Language from './Language.vue';
import { driveCreateRoute, driveListRoute } from '../router/index';

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
      links: [
        {
          text: this.$t('common.new_route'),
          to: driveCreateRoute.path,
        },
        {
          text: this.$t('common.routes'),
          to: driveListRoute.path,
        },
      ],
    };
  },

};
</script>

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
