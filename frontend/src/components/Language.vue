<template>
  <div>
    <ul
      class="lang">
      <li
        v-for="language in languagesOrder"
        :key="language"
        @click="changeLang(language)">
        <flag
          :iso="language" />
      </li>
    </ul>
  </div>
</template>

<script>

import { languagesOrder } from '../main';

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Language',
  methods: {
    changeLang(languageChecked) {
      this._i18n.locale = languageChecked;
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
  font-size: 30px;
  margin-left: 20px;
}
</style>
