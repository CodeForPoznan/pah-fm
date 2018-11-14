<template>
    <div class="header p-3">
        <h1><a href="https://www.pah.org.pl/">Polish Humanitarian Action</a></h1>
        <b-nav fill v-for="link in links" :key="link.text">
            <b-nav-item v-bind:to="link.to">{{ link.text }}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      links: [
        {
          text: 'Home',
          to: '/',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../scss/variables';
    @import '../scss/mixins';

    .header {
        background: $blue;
        text-align: center;

        @include respond-to(tablet) {
            background: $grey;
        }
    }
</style>
