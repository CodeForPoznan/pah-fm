<template>
  <div>

    {{ data }} {{ loading }}
    <button @click="getCars">action</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { namespaces } from '../store'
import { DATA, LOADING } from '../store/constants';

export default {
  name: 'RoutesView',
  data() {
    return {
      routeVisible: null,
    };
  },
  methods: {
    showRoute(id) {
      this.routeVisible = id;
    },
    ...mapActions(namespaces.cars, ['getCars']),
  },
  computed: {
    ...mapState(['routes']),
    ...mapState(namespaces.cars, [DATA, LOADING]),
  },
};
</script>

<style scoped lang="scss">
.card-header {
  cursor: pointer;
}

.accordion {
  max-height: 300px;
  overflow: auto;
}
</style>
