<template>
  <div>
    <b-nav-item
      v-for="link in links"
      :to="link.to"
      :key="link.text">{{
        $t(link.text)
      }}</b-nav-item>
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
