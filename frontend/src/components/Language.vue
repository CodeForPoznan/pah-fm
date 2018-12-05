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
ul.lang {
  list-style-type: none;
  float: right;
  padding-left: 10px;
  cursor: pointer;
}

.lang li {
  display: inline;
  font-size: 1.5em;
  margin-left: 0.5em;
}
</style>
