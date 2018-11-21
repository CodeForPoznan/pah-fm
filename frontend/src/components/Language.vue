<template>
    <div class="row justify-content-end">
        <div class="col-4">
            <span v-for="(w, key) in languages">
                <button v-on:click="changeLang(key)">
                    <Pl v-if="w == 'pl'" />
                    <En v-if="w == 'en'" />
                </button>
            </span>
        </div>
    </div>
</template>

<script>
import { languages } from '../main';
import En from './svg/En.vue';
import Pl from './svg/Pl.vue';

export default {
name: 'Language',
  components: {
    En,
    Pl,
  },
methods: {
  changeLang: function (event) {
    this._i18n.locale = languages[event];
  }
},
data: function () {
  return {
    languages
  };
}
};
</script>

<style scoped>
</style>
