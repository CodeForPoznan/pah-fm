<template>
  <div class="row justify-content-end">
    <div class="col-4">
      <ul
        v-for="(index, key) in languages"
        :key="index"
        class="lang">
        <li @click="changeLang(key)">
          <Pl v-if="index == 'pl'" />
          <En v-if="index == 'en'" />
          <Ua v-if="index == 'ua'" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { languages } from '../main';
import En from './svg/En.vue';
import Pl from './svg/Pl.vue';
import Ua from './svg/Ua.vue';
/* eslint-disable no-underscore-dangle */
export default {
  name: 'Language',
  components: {
    En,
    Pl,
    Ua,
  },
  methods: {
    changeLang(event) {
      this._i18n.locale = languages[event];
      console.log(this._i18n.locale);
    },
  },
  data() {
    return {
      languages,
    };
  },
};
</script>

<style scoped>
    .lang {
        list-style-type: none;
        float: right;
        padding-left: 10px;
    }
</style>
