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
              <ul>
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
                  class="form-control"
                  :class="{ 'is-invalid': errors['car'] }"
                >
                  <option
                    v-for="car in cars.data"
                    :key="car.id"
                    :value="car"
                  >{{ car.plates }}</option>
                </select>
                <p
                  class="font-weight-bold"
                  v-if="!cars.data">{{ $t('routes.no_cars_message') }}</p>
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
                <label>{{ $t('routes.from') }}</label>
                <input
                  type="text"
                  v-model="route.from"
                  name="from"
                  class="form-control"
                  :class="{ 'is-invalid': errors['from']}"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.destination') }}</label>
                <input
                  type="text"
                  v-model="route.destination"
                  name="destination"
                  class="form-control"
                  :class="{ 'is-invalid': errors['destination'] }"
                >
              </div>
              <div class="row">
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.starting_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.startMileage"
                    name="startMileage"
                    class="form-control"
                    :class="{ 'is-invalid': errors['startMileage'] }"
                  >
                </div>
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.ending_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.endMileage"
                    name="endMileage"
                    class="form-control"
                    :class="{ 'is-invalid': errors['endMileage'] }"
                  >
                </div>
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
import { mapActions, mapState } from 'vuex';
import * as actions from '../store/actions';
import { isErroring, makeErrors } from './services';
import { namespaces, actions as apiActions } from '../store/constants';

const defaultFormState = {
  date: '',
  car: null,
  description: '',
  from: '',
  destination: '',
  startMileage: '',
  endMileage: '',
  isSynced: false,
};

export default {
  name: 'RouteFormView',
  data() {
    return {
      route: { ...defaultFormState },
      errors: {},
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),
    ...mapActions(namespaces.drives, [apiActions.fetchDrives]),
    ...mapActions(namespaces.cars, [apiActions.fetchCars]),
    ...mapActions(namespaces.passengers, [apiActions.fetchPassengers]),
    handleSubmit() {
      this.validateForm();

      if (!Object.keys(this.errors).length) {
        this[actions.SUBMIT]({ form: this.route });
        this.route = { ...defaultFormState };
      }
    },

    validateForm() {
      const { route } = this;

      const makeErrorsPartial = makeErrors(this.$t.bind(this));

      this.errors = Object.keys(route)
        .filter(isErroring(route))
        .reduce(makeErrorsPartial, {});

      const { startMileage, endMileage } = this.route;

      if (
        !!startMileage
        && !!endMileage
        && parseInt(startMileage, 10) >= parseInt(endMileage, 10)
      ) {
        this.errors.startMileage = this.$t('common.start_mileage_error');
        this.errors.endMileage = this.$t('common.end_mileage_error');
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
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.error::first-letter {
  text-transform: capitalize;
}
</style>

