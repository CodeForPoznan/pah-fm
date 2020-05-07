<template>
  <div>
    <b-nav-item
      v-for="link in links"
      :to="link.to"
      :key="link.text"
    >
      {{
        $t(link.text)
      }}
    </b-nav-item>
  </div>
</template>

<script>
import flatMap from 'array.prototype.flatmap';
import { mapState } from 'vuex';
import { USER } from '../store';
import { groupBasedRoutes } from '../router/routes';

export default {
  name: 'NavigationItems',
  computed: {
    ...mapState([USER]),
    links() {
      if (this.user) {
        return flatMap(this.user.groups, ({ name }) => groupBasedRoutes[name.toLowerCase()])
          .filter((route) => route.visibleOnMenu);
      }
      return [];
    },
  },
};
</script>
