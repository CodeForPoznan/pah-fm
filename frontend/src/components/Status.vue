<template>
  <div
    v-if="!isLogin && user"
    class="is-online"
    :class="{ online: isOnline }"
  />
</template>

<script>
import { mapState } from 'vuex';
import { USER } from '../store';
import { IS_ONLINE } from '../store/constants';
import { loginRoute } from '../router/routes';

export default {
  name: 'Refresh',
  computed: {
    ...mapState([IS_ONLINE, USER]),
  },
  data() {
    return {
      isLogin: this.$router.currentRoute.path === loginRoute.path,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.is-online {
  @include absolute(left 0 top 0);
  @include m(3);

  height: 10px;
  width: 10px;
  background-color: $red;
  border-radius: 50%;
  display: inline-block;
}

.is-online span {
  margin-left: 20px;
  margin-bottom: 25px;
}

.online {
  background-color: $green;
  line-height: inherit;
}
</style>
