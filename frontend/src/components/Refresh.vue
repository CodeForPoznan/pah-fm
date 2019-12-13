<template>
  <div
    id="refresh"
    v-if="updateReady"
  >
    <span> {{ $t("refresh.new_version") }}
      <a
        @click="reload"
        href="#"
      >{{ $t("refresh.reload") }}</a>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Refresh',
  computed: {
    ...mapState(['updateReady']),
  },
  methods: {
    reload: () => window.location.reload(),
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

#refresh {
  @include p(3);
  @include sticky();

  width: 100%;
  bottom: 0;
  background: $white;
}
</style>

