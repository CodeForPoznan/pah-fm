<template>
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import { USER } from '../store';
import { LOGOUT } from '../store/actions';
import { IS_ONLINE } from '../store/constants';

export default {
  name: 'UserDetails',
  computed: {
    ...mapState([USER]),
    ...mapGetters([IS_ONLINE]),
  },
  methods: {
    ...mapActions([LOGOUT]),
  },
};
</script>

<style scoped>
.offline {
  cursor: default;
  pointer-events: none;
  text-decoration: none;
}
</style>
