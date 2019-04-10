<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <b-alert
              variant="success"
              dismissible
              :show="confirmationOnline"
              @dismissed="confirmationOnline=false"
            >
              <b>{{ $t('drive_form.drive_added_online_notification') }}</b>
            </b-alert>
            <b-alert
              variant="secondary"
              dismissible
              :show="confirmationOffline"
              @dismissed="confirmationffline=false"
            >
              <b>{{ $t('drive_form.drive_added_offline_notification') }}</b>
            </b-alert>
            <div
              class="alert alert-danger errors"
              v-if="Object.keys(errors).length">
              <b>{{ $t('drive_form.please_correct_errors') }}</b>
              <ul class="error-list">
                <li
                  class="error"
                  v-for="error in Object.keys(errors)"
                  :key="error">{{ errors[error] }}</li>
              </ul>
            </div>
            <h2>{{ $t('common.new_drive') }}</h2>
            <form
              @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>{{ $t('drive_form.date') }}</label>
                <input
                  type="date"
                  v-model="drive.date"
                  name="date"
                  class="form-control"
                  :class="{ 'is-invalid': errors['date'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.start_location') }}</label>
                <input
                  type="text"
                  v-model="drive.startLocation"
                  name="startLocation"
                  maxlength="100"
                  class="form-control"
                  :class="{ 'is-invalid': errors['startLocation'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.starting_mileage') }}</label>
                <input
                  min="0"
                  onkeypress="return event.key === 'Enter'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
                  type="number"
                  v-model="drive.startMileage"
                  name="startMileage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['startMileage'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.project') }}</label>
                <select
                  v-if="projects.data"
                  v-model="drive.project"
                  name="car"
                  class="form-control"
                  :class="{ 'is-invalid': errors['project'] }"
                >
                  <option
                    v-for="project in projects.data"
                    :key="project.id"
                    :value="project.id"
                  >{{ project.title }}</option>
                </select>
                <p
                  class="font-weight-bold"
                  v-if="!cars.data">{{ $t('drive_form.no_project_message') }}</p>
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.cars') }}</label>
                <select
                  v-if="cars.data"
                  v-model="drive.car"
                  name="car"
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
                  v-if="!cars.data">{{ $t('drive_form.no_cars_message') }}</p>
              </div>

              <div class="form-group">
                <label>{{ $t('drive_form.passengers') }}</label>
                <multi-select
                  :options="passengers"
                  :selected-options="selectedPassengers"
                  @select="onPassengerSelect"
                  :class="{ 'is-invalid': errors['passengers']}" />
              </div>

              <div class="form-group">
                <label>{{ $t('drive_form.description') }}</label>
                <input
                  type="text"
                  v-model="drive.description"
                  name="description"
                  class="form-control"
                  :class="{ 'is-invalid': errors['description']}"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.end_location') }}</label>
                <input
                  type="text"
                  maxlength="100"
                  v-model="drive.endLocation"
                  name="endLocation"
                  class="form-control"
                  :class="{ 'is-invalid': errors['endLocation'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.ending_mileage') }}</label>
                <input
                  min="0"
                  onkeypress="return event.key === 'Enter'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
                  type="number"
                  v-model="drive.endMileage"
                  name="endMileage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['endMileage'] }"
                >
              </div>
              <div class="form-group col-xs-12">
                {{ $t('drive_form.distance_traveled', { distance: distance }) }}
              </div>
              <div class="form-group">
                <button
                  class="btn btn-primary"
                >{{ $t('drive_form.submit') }}</button>
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

import { mapActions, mapGetters, mapState } from 'vuex';
import * as actions from '../store/actions';
import { isErroring, makeErrors, stringFields } from './services';
import { namespaces, actions as apiActions, IS_ONLINE } from '../store/constants';

const defaultFormState = {
  date: '',
  car: '',
  description: '',
  startMileage: '',
  endMileage: '',
  project: '',
  passengers: [],
  startLocation: '',
  endLocation: '',
};

export default {
  name: 'DriveFormView',
  components: {
    MultiSelect,
  },
  data() {
    return {
      drive: { ...defaultFormState },
      errors: {},
      searchText: '',
      selectedPassengers: [],
      lastSelectPassenger: {},
      confirmationOnline: false,
      confirmationOffline: false,
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),
    ...mapActions(namespaces.cars, [apiActions.fetchCars]),
    ...mapActions(namespaces.passengers, [apiActions.fetchPassengers]),
    ...mapActions(namespaces.projects, [apiActions.fetchProjects]),
    onPassengerSelect(passengers, lastSelectPassenger) {
      this.selectedPassengers = passengers;
      this.lastSelectPassenger = lastSelectPassenger;
      this.drive.passengers = passengers.map(i => i.value);
    },
    handleSubmit() {
      this.validateForm();
      this.confirmationOffline = false;
      this.confirmationOnline = false;

      if (!Object.keys(this.errors).length) {
        this[actions.SUBMIT]({ form: { ...this.drive, syncId: Math.floor(Date.now() / 1000) } });
        this.drive = { ...defaultFormState };
        this.selectedPassengers = [];
        if (this.isOnline) {
          this.confirmationOnline = true;
        } else {
          this.confirmationOffline = true;
        }
      }
    },

    validateForm() {
      const makeErrorsPartial = makeErrors(this.$t.bind(this));

      const data =
        Object.entries(this.drive).reduce((acc, [key, value]) =>
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
        this.errors.passengers = this.$t('drive_form.passengers_error');
      }

      const { startMileage, endMileage } = data;
      if (
        !!startMileage
        && !!endMileage
        && parseInt(startMileage, 10) >= parseInt(endMileage, 10)
      ) {
        this.errors.startMileage = this.$t('drive_form.start_mileage_error');
        this.errors.endMileage = this.$t('drive_form.end_mileage_error');
      }
    },
  },
  created() {
    this[apiActions.fetchCars]();
    this[apiActions.fetchPassengers]();
    this[apiActions.fetchProjects]();
  },

  computed: {
    ...mapState(namespaces.cars, {
      cars: state => state,
    }),
    ...mapState(namespaces.projects, {
      projects: state => state,
    }),
    ...mapState(namespaces.passengers, {
      passengers: state => (state.data || []).map(p => ({
        value: p.id,
        text: [p.firstName, p.lastName].join(' '),
      })),
    }),
    ...mapGetters([IS_ONLINE]),
    distance() {
      const distance = this.drive.endMileage - this.drive.startMileage;
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

.wrapper {
  @include m(2);
}
</style>
