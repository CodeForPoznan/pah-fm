<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <div
              class="alert alert-danger"
              v-if="errors.length">
              <b>{{ $t('routes.please_correct_errors') }}</b>
              <ul>
                <li
                  v-for="error in errors"
                  :key="error">{{ error }}</li>
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
                  :class="{ 'is-invalid': isSubmitted && !route.date }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.cars') }}</label>
                <select
                  v-if="!!cars.data.length"
                  v-model="route.car"
                  name="car"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.car }"
                >
                  <option
                    v-for="car in cars.data"
                    :key="car.id"
                    :value="car"
                  >{{ car.plates }}</option>
                </select>
                <p
                  class="font-weight-bold"
                  v-if="!cars.data.length">{{ $t('routes.no_cars_message') }}</p>
              </div>
              <div class="form-group">
                <label>{{ $t('routes.description') }}</label>
                <input
                  type="text"
                  v-model="route.description"
                  name="description"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.description }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.from') }}</label>
                <input
                  type="text"
                  v-model="route.from"
                  name="from"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.from }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.destination') }}</label>
                <input
                  type="text"
                  v-model="route.destination"
                  name="destination"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.destination }"
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
                    :class="{ 'is-invalid': isSubmitted && !route.startMileage }"
                  >
                </div>
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.ending_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.endMileage"
                    name="endMileage"
                    class="form-control"
                    :class="{ 'is-invalid': isSubmitted && !route.endMileage }"
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
import uuidv4 from 'uuid/v4';
import * as actions from '../store/actions';
import { isErroring, makeErrorMessage } from './services';
import { CARS } from '../store';
import { namespaces, actions as apiActions } from '../store/constants';


const defaultFormState = {
  id: '',
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
      errors: [],
      isSubmitted: false,
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),
    ...mapActions(namespaces.drives, [apiActions.fetchDrives]),
    ...mapActions(namespaces.cars, [apiActions.fetchCars]),
    ...mapActions(namespaces.passengers, [apiActions.fetchPassengers]),
    handleSubmit() {
      this.validateForm();
      this.isSubmitted = true;


      if (!this.errors.length) {
        this.route.id = uuidv4();
        this[actions.SUBMIT]({ form: this.route });
        this.route = { ...defaultFormState };
        this.isSubmitted = false;
      }
    },

    validateForm() {
      const { route } = this;
      this.errors = Object.keys(route)
        .filter(isErroring(route))
        .map(makeErrorMessage(this.$t.bind(this)));
    },
  },
  created() {
    this.fetchDrives();
    this.fetchCars();
    this.fetchPassengers();
  },
  computed: {
    ...mapState([CARS]),
  },
};
</script>

<style scoped lang="scss">
  @import "../scss/base";

  .jumbotron {
    @include my(4);
  }
</style>

