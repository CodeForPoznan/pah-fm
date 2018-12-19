<template>
    <div>
        Confirmation.
        Token: {{ this.$route.params.token }}
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
  import { VERIFY_CONFIRMATION_TOKEN } from '../store/actions';

  export default {
    name: 'ConfirmationView',
    created() {
        this[VERIFY_CONFIRMATION_TOKEN](this.$route.params.token);
    },
    methods: {
      ...mapActions([VERIFY_CONFIRMATION_TOKEN]),
    },
  }
</script>
