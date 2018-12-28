<template>
  <div
    v-if="!isLogin"
    class="is-online"
    :class="{ online: isOnline }">
    <span>
      {{ user.username }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { IS_ONLINE, USER } from '../store';
import { LOGIN_PATH } from '../router/constants';

export default {
  name: 'Refresh',
  computed: {
    ...mapState([IS_ONLINE, USER]),
  },
  data() {
    return {
      isLogin: this.$router.currentRoute.path === LOGIN_PATH,
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

