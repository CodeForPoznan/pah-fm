<template>
  <div
    v-if="!routes.length"
    class="alert alert-warning m-5"
    role="alert">
    {{ $t('routes.no_driver_routes') }}
  </div>
  <div
    v-else
    class="accordion m-5"
    id="routesAccordion">
    <div
      class="card"
      v-for="route in routes"
      :key="route.id">
      {{route}}
      <div
        class="card-header"
        @click="showRoute(route.id)">
        <h5 class="mb-0">
          <span class="font-weight-bold">{{ route.date }}</span>
          {{ $t('routes.from_to', { from: route.from, destination: route.destination}) }}
        </h5>
      </div>
      <div :class="['collapse', { show: routeVisible === route.id }]">
        <div class="card-body">
          <p>
            <span class="font-weight-bold">{{ $t('routes.description') }}</span>
            <span>{{ route.description }}</span>
          </p>
          <p>
            <span class="font-weight-bold">{{ $t('routes.starting_mileage') }}</span>
            <span>{{ route.startMileage }}</span>
          </p>
          <p>
            <span class="font-weight-bold">{{ $t('routes.ending_mileage') }}</span>
            <span>{{ route.endMileage }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ROUTES } from '../store/constants'

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
  },
  computed: {
    routes: function() {
      return this.$store.state[ROUTES].data || [];
    }
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
