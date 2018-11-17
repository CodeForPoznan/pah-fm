<template>
  <span :class="{ isOnline: true, online: isOnline }"/>
</template>

<script>
import { mapState } from 'vuex';
import { IS_ONLINE } from '../store';

export default {
  name: 'Refresh',
  computed: {
    ...mapState([IS_ONLINE]),
  },
};
</script>

<style scoped lang="scss">
  @import "../scss/base";

  .isOnline {
    @include absolute(left 0 top 0);
    @include m(3);
    height: 10px;
    width: 10px;
    background-color: $red;
    border-radius: 50%;
    display: inline-block;
  }

  .online {
    background-color: $green;
  }


</style>

