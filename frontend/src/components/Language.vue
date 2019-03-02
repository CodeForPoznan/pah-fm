<template>
  <div>
    <ul
      class="lang">
      <li
        v-for="language in languagesOrder"
        :key="language"
        @click="changeLang(language)">
        <flag
          :iso="language"
          :squared="false"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { languagesOrder } from '../main';
import * as actions from '../store/actions';

export default {
  name: 'Language',
  methods: {
    ...mapActions([actions.SWITCH_LANGUAGE]),
    changeLang(languageChecked) {
      this[actions.SWITCH_LANGUAGE](languageChecked);
    },
  },
  data() {
    return {
      languagesOrder,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base';

ul.lang {
  @include list-unstyled;
  @include flex(row, center, space-around);
  width: 100%;
  margin-top: 80px;
}

.lang li span {
  cursor: pointer;
  height: 50px;
  width: 40px;
}
</style>
