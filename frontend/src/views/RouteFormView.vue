<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <div
              class="alert alert-danger errors"
              v-if="Object.keys(errors).length">
              <b>{{ $t('routes.please_correct_errors') }}</b>
              <ul class="error-list">
                <li
                  class="error"
                  v-for="error in Object.keys(errors)"
                  :key="error">{{ errors[error] }}</li>
              </ul>
            </div>
            <h2>{{ $t('common.new_route') }}</h2>
            <form
              @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>{{ $t('routes.date') }}</label>
                <input
                  type="date"
                  v-model="route.date"
                  name="date"
                  class="form-control"
                  :class="{ 'is-invalid': errors['date'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.cars') }}</label>
                <select
                  v-if="cars.data"
                  v-model="route.car"
                  name="car"
                  value=""
                  class="form-control"
                  :class="{ 'is-invalid': errors['car'] }"
                >
                  <option
                    v-for="car in cars.data"
                    :key="car.id"
                    :value="car.id"
                  >{{ car.plates }}</option>
                </select>
                <p
                  class="font-weight-bold"
                  v-if="!cars.data">{{ $t('routes.no_cars_message') }}</p>
              </div>

              <div class="form-group">
                <label>{{ $t('routes.passengers') }}</label>
                <multi-select
                  :options="passengers"
                  :selected-options="selectedPassengers"
                  @select="onPassengerSelect"
                  :class="{ 'is-invalid': errors['passengers']}" />
              </div>

              <div class="form-group">
                <label>{{ $t('routes.description') }}</label>
                <input
                  type="text"
                  v-model="route.description"
                  name="description"
                  class="form-control"
                  :class="{ 'is-invalid': errors['description']}"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.start_location') }}</label>
                <input
                  type="text"
                  v-model="route.start_location"
                  name="start_location"
                  class="form-control"
                  :class="{ 'is-invalid': errors['start_location'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.end_location') }}</label>
                <input
                  type="text"
                  v-model="route.end_location"
                  name="end_location"
                  class="form-control"
                  :class="{ 'is-invalid': errors['end_location'] }"
                >
              </div>
              <div class="row">
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.starting_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.start_mileage"
                    name="start_mileage"
                    class="form-control"
                    :class="{ 'is-invalid': errors['start_mileage'] }"
                  >
                </div>
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.ending_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.end_mileage"
                    name="end_mileage"
                    class="form-control"
                    :class="{ 'is-invalid': errors['end_mileage'] }"
                  >
                </div>
              </div>
              <div class="form-group col-xs-12">
                {{ $t('routes.distance_traveled', { distance: distance }) }}
              </div>
              <div class="form-group">
                <button
                  class="btn btn-primary"
                >{{ $t('routes.submit') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MultiSelect } from 'vue-search-select';

import { mapActions, mapState } from 'vuex';
import * as actions from '../store/actions';
import { isErroring, makeErrors, stringFields } from './services';
import { namespaces, actions as apiActions } from '../store/constants';

const defaultFormState = {
  date: '',
  car: '',
  description: '',
  start_mileage: '',
  end_mileage: '',
  passengers: [],
  start_location: '',
  end_location: '',
};

export default {
  name: 'RouteFormView',
  components: {
    MultiSelect,
  },
  data() {
    return {
      route: { ...defaultFormState },
      errors: {},
      searchText: '',
      selectedPassengers: [],
      lastSelectPassenger: {},
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),
    ...mapActions(namespaces.drives, [apiActions.fetchDrives]),
    ...mapActions(namespaces.cars, [apiActions.fetchCars]),
    ...mapActions(namespaces.passengers, [apiActions.fetchPassengers]),
    onPassengerSelect(passengers, lastSelectPassenger) {
      this.selectedPassengers = passengers;
      this.lastSelectPassenger = lastSelectPassenger;
      this.route.passengers = passengers.map(i => i.value);
    },
    handleSubmit() {
      this.validateForm();

      if (!Object.keys(this.errors).length) {
        this[actions.SUBMIT]({ form: this.route });
        this.route = { ...defaultFormState };
        this.selectedPassengers = [];
      }
    },

    validateForm() {
      const makeErrorsPartial = makeErrors(this.$t.bind(this));

      const data =
        Object.entries(this.route).reduce((acc, [key, value]) =>
          ({
            ...acc,
            [key]: stringFields.includes(key)
              ? String(value).trim()
              : value,
          }), {});

      this.errors = Object.keys(data)
        .filter(isErroring(data))
        .reduce(makeErrorsPartial, {});

      if (!data.passengers || !data.passengers.length) {
        this.errors.passengers = this.$t('routes.passengers-error');
      }

      /* eslint-disable camelcase */
      const { start_mileage, end_mileage } = data;
      if (
        !!start_mileage
        && !!end_mileage
        && parseInt(start_mileage, 10) >= parseInt(end_mileage, 10)
      ) {
        this.errors.start_mileage = this.$t('common.start_mileage_error');
        this.errors.end_mileage = this.$t('common.end_mileage_error');
      }
    },
  },
  created() {
    this[apiActions.fetchCars]();
    this[apiActions.fetchDrives]();
    this[apiActions.fetchPassengers]();
  },

  computed: {
    ...mapState(namespaces.cars, {
      cars: state => state,
    }),
    ...mapState(namespaces.passengers, {
      passengers: state => (state.data || []).map(p => ({
        value: p.id,
        text: [p.firstName, p.lastName].join(' '),
      })),
    }),
    distance() {
      const distance = this.route.end_mileage - this.route.start_mileage;
      return distance > 0 ? distance : 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.error::first-letter {
  text-transform: capitalize;
}

.is-invalid {
  border-color: red !important;
}

.error-list {
  margin-bottom: 0;
}
</style>

