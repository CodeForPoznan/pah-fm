<template>
  <div class="alert alert-danger errors">
    <b>{{ $t('common.please_correct_errors') }}</b>
    <ul class="error-list">
      <li
        class="error"
        v-for="error in Object.keys(errors)"
        :key="error">{{ errors[error] }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ErrorList',
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
};
</script>
