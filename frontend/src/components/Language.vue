<template>
  <div>
    <ul
      class="lang"
       v-bind:class="{ 'lang-wrap': wrap }"
    >
      <li
        v-for="language in languagesOrder"
        :key="language"
        @click="changeLang(language)"
      >
        <flag
          v-if="language !== 'ir'"
          :iso="language"
          :squared="false"
        />
        <span v-else>Kurdî / كوردی</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { languagesOrder } from '../services/lang';
import * as actions from '../store/actions';

export default {
  name: 'Language',
  props:  {
    wrap: {
      type: Boolean,
      required: false,
    },
  },
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

ul.lang-wrap {
  flex-wrap: wrap;
}

.lang li span {
  cursor: pointer;
  height: 50px;
  width: 40px;
}
</style>
