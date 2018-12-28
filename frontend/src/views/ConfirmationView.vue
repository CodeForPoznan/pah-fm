<template>
  <div>
    <div v-if="token && verificationToken && token === verificationToken.token">
        <div v-if="verificationToken.isActive">
            Token active.
        </div>
        <div v-else>
            Token inactive.
        </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as actions from '../store/actions';
import { VERIFICATION_TOKEN } from '../store/constants';

export default {
  name: 'ConfirmationView',
  created() {
    this[actions.VERIFY_CONFIRMATION_TOKEN](this.token);
  },
  computed: {
    ...mapState([VERIFICATION_TOKEN]),
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    ...mapActions([actions.VERIFY_CONFIRMATION_TOKEN]),
  },
};
</script>
