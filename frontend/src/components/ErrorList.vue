<template>
  <div class="alert alert-danger errors">
    <b>{{ $t('common.please_correct_errors') }}</b>
    <ul class="error-list">
      <li
        class="error"
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ $t('form_errors.validation_error', { field: $t(`form_errors.${error}`)}) }}
      </li>
      <li
        class="error"
        v-for="(error, index) in otherErrors"
        :key="index"
      >
        {{ $t(error) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ErrorList',
  props: {
    errors: {
      type: Array,
      required: true,
    },
    otherErrors: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.error::first-letter {
  text-transform: capitalize;
}
</style>
