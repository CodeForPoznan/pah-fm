<template>
  <div class="alert alert-danger errors">
    <b>{{ $t('common.please_correct_errors') }}</b>
    <ul class="error-list">
      <li
        class="error"
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
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
  },
};
</script>

<style scoped>
.error::first-letter {
  text-transform: capitalize;
}
</style>
