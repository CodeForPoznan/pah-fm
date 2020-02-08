<template>
  <div>
    <b-nav-item
      v-if="user"
      v-b-modal.logout-modal
      key="logout"
      class="username"
      :class="{ offline: !isOnline }"
    >
      {{ $t('common.logout') }}
      <p>{{ user.username }}</p>
    </b-nav-item>
    <logout-modal />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import { USER } from '../store';
import { LOGOUT } from '../store/actions';
import { IS_ONLINE } from '../store/constants';

import LogoutModal from './LogoutModal.vue';

export default {
  name: 'UserDetails',
  components: {
    LogoutModal,
  },
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
