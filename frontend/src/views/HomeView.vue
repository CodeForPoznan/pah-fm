<template>
  <div class="home p-3">
    <h4/>
    <p v-if="pageNotFound">{{ $t('common.pageNotFound') }}</p>
    <p v-else>{{ $t('common.intro') }}</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  props: {
    pageNotFound: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
