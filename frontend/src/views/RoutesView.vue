<template>
  <div v-if="!routes.length" class="alert alert-warning m-5" role="alert">
    You have no routes stored in database. You can add a new route by choosing option from the menu.
  </div>
  <div v-else class="accordion m-5" id="routesAccordion">
    <div class="card" v-for="route in routes">
      <div class="card-header" @click="showRoute(route.id)">
        <h5 class="mb-0">
          <span class="font-weight-bold">{{ route.date }}</span> From {{ route.from }} to {{ route.destination }}
        </h5>
      </div>
      <div :class="['collapse', { show: routeVisible === route.id }]">
        <div class="card-body">
          <p>
            <span class="font-weight-bold">Reason: </span>
            <span>{{ route.reason }}</span>
          </p>
          <p>
            <span class="font-weight-bold">Start mileage: </span>
            <span>{{ route.mileageBefore }}</span>
          </p>
          <p>
            <span class="font-weight-bold">End mileage: </span>
            <span>{{ route.mileageAfter }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "RoutesView",
        data() {
            return {
                routeVisible: null,
            };
        },
        methods: {
            showRoute: function(id) {
                this.routeVisible = id;
            }
        },
        computed: {
          ...mapState(['routes']),
        },
    }
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
