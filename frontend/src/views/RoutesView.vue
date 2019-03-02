<template>

  <div
    v-if="!routes.length && !drives.length"
    class="alert alert-warning m-5"
    role="alert">
    {{ $t('routes.no_driver_routes') }}
  </div>
  <div
    v-else
  >

    <h4
      class="heading"
      v-if="routes.length"
    >
      {{ $t('routes.unsynced_drives') }}
    </h4>

    <div
      class="card"
      v-for="route in routes"
      :key="route.id">
      <div
        class="card-header"
        @click="showRoute(route.id)">
        <h5 class="mb-0">
          <span class="font-weight-bold">{{ route.date }}</span>
          {{ $t('routes.from_to', { from: route.startLocation, destination: route.endLocation}) }}
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
            <span>{{ route.startMileage }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('routes.ending_mileage') }}</span>
            <span>{{ route.endMileage }}</span>
          </p>
        </div>
      </div>
    </div>

    <h4
      class="heading"
      v-if="drives.length"
    >
      {{ $t('routes.synced_drives') }}
    </h4>
    <div
      class="card"
      v-for="route in drives"
      :key="route.id">
      <div
        class="card-header"
        @click="showRoute(route.id)">
        <h5 class="mb-0">
          <span class="font-weight-bold">{{ route.date }}</span>
          {{ $t('routes.from_to', { from: route.startLocation, destination: route.endLocation}) }}
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
            <span>{{ route.startMileage }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('routes.ending_mileage') }}</span>
            <span>{{ route.endMileage }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapActions, mapState } from 'vuex';
import { actions as apiActions, namespaces } from '../store/constants';

export default {
  name: 'RoutesView',
  data() {
    return {
      routeVisible: null,
    };
  },
  methods: {
    ...mapActions(namespaces.drives, [apiActions.fetchDrives]),
    showRoute(id) {
      this.routeVisible = id;
    },
  },
  computed: {
    ...mapState(['routes']),
    ...mapState(namespaces.drives, {
      drives: state => state.data || [],
    }),
  },
  created() {
    this[apiActions.fetchDrives]();
  },
};
</script>

<style scoped lang="scss">
.card-header {
  cursor: pointer;
}

.heading {
  text-align: center;
}
</style>
