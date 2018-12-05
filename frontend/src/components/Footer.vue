<template>
  <div class="footer p-3">
    <h3 class="heading"><a href="http://codeforpoznan.pl">Code for Poznan</a></h3>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.heading {
  margin: 0;

  @include media-breakpoint-down (sm) {
    font-size: 1rem;
  }
}

.footer {
  background: $grey;
}
</style>
