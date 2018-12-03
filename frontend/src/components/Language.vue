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

import { languagesOrder } from '../main';

export default {
  name: 'Language',
  methods: {
    changeLang(languageChecked) {
    /* eslint-disable-next-line no-underscore-dangle */
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
  font-size: 1.5em;
  margin-left: 0.5em;
}
</style>
