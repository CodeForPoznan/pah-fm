
<template>
  <div>
    <b-nav-item
      v-for="link in links"
      :to="link.to"
      :key="link.text">{{ $t(link.text) }}</b-nav-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { USER } from '../store';
import { groupBasedRoutes } from '../router/index';

export default {
  name: 'NavigationItems',
  computed: {
    ...mapState([USER]),
    links() {
      return this.user.groups.reduce(
        (acc, { name }) => [...acc, ...groupBasedRoutes[name.toLowerCase()]],
        [],
      );
    },
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

.offline {
  cursor: default;
  pointer-events: none;
  text-decoration: none;
}
</style>
