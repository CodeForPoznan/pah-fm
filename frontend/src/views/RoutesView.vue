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
            <span class="font-weight-bold mr-1">{{ $t('routes.description') }}</span>
            <span>{{ route.description }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('routes.car') }}</span>
            <span>{{ route.car.plates }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('routes.starting_mileage') }}</span>
            <span>{{ route.start_mileage }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('routes.ending_mileage') }}</span>
            <span>{{ route.end_mileage }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

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
    ...mapState(['routes']),
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
