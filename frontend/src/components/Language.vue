<template>
  <div>
    <ul
      v-for="(index, key) in languages"
      :key="index"
      class="lang">
      <li @click="changeLang(key)">
        <flag
          v-if="index == 'en'"
          iso="gb" />
        <flag
          v-if="index == 'pl'"
          iso="pl"/>
        <flag
          v-if="index == 'ua'"
          iso="ua" />
      </li>
    </ul>
  </div>
</template>

<script>

import { languages } from '../main';

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Language',
  methods: {
    changeLang(event) {
      this._i18n.locale = languages[event];
    },
  },
  data() {
    return {
      languages,
    };
  },
};
</script>

<style scoped lang="scss">
.lang {
  list-style-type: none;
  float: right;
  padding-left: 10px;
  cursor: pointer;
}

.lang li {
  height: 30px;
  width: 40px;
}
</style>
