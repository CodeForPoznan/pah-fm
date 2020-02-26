<template>
  <div>
    <b-nav-item
      v-if="user"
      v-b-modal.logout-modal
      key="logout"
      class="username"
    >
      {{ $t('common.logout') }}
      <p>{{ user.username }}</p>
    </b-nav-item>
    <logout-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import router from '../router';
import { logoutRoute } from '../router/routes';
import { USER } from '../store';

import LogoutModal from './LogoutModal.vue';

export default {
  name: 'UserDetails',
  components: {
    LogoutModal,
  },
  computed: {
    ...mapState([USER]),
  },
};
</script>
