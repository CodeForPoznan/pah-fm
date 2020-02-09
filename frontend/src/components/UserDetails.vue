<template>
  <div>
    <b-nav-item
      v-if="user"
      v-b-modal.logout-modal
      @click="logout"
      key="logout"
      class="username"
    >
      {{ $t('common.logout') }}
      <p>{{ user.username }}</p>
    </b-nav-item>
    <logout-modal v-if="!isOnline" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import router from '../router';

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
    logout() {
      if (this.isOnline) {
        this.LOGOUT(router);
      }
    },
  },
};
</script>
