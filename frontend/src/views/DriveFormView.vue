<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <div
              class="alert alert-danger errors"
              v-if="Object.keys(errors).length">
              <b>{{ $t('drive_form.please_correct_errors') }}</b>
              <ul class="error-list">
                <li
                  class="error"
                  v-for="error in Object.keys(errors)"
                  :key="error"
                >{{ errors[error] }}</li>
              </ul>
            </div>
            <h2>{{ $t('common.new_drive') }}</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>{{ $t('drive_form.date') }}</label>
                <input
                  type="date"
                  @change="syncToLocalStorage"
                  v-model="drive.date"
                  name="date"
                  :max="currentDate"
                  class="form-control"
                  :class="{ 'is-invalid': errors['date'] }"
                >
              </div>

              <div class="form-group">
                <label>{{ $t('drive_form.start_location') }}</label>
                <input
                  type="text"
                  v-model="drive.startLocation"
                  @input="syncToLocalStorage"
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
                  @input="syncToLocalStorage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['startMileage'] }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('drive_form.project') }}</label>
                <select
                  v-if="projects.data"
                  @change="syncToLocalStorage"
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
                  v-if="!cars.data"
                >{{ $t('drive_form.no_project_message') }}</p>
              </div>

              <div class="form-group">
                <label>{{ $t('drive_form.cars') }}</label>
                <select
                  v-if="cars.data"
                  v-model="drive.car"
                  @change="syncToLocalStorage"
                  name="car"
                  class="form-control"
                  :class="{ 'is-invalid': errors['car'] }"
                >
                  <option
                    v-for="car in cars.data"
                    :key="car.id"
                    :value="car.id">{{ car.plates }}</option>
                </select>
                <p
                  class="font-weight-bold"
                  v-if="!cars.data">{{ $t('drive_form.no_cars_message') }}</p>
              </div>

              <div class="form-group">
                <label>{{ $t('drive_form.passenger') }}</label>
                <v-select
                  v-model="drive.passenger"
                  name="passenger"
                  @change="syncToLocalStorage"
                  class="select"
                  :class="{ 'is-invalid': errors['passenger'] }"
                  label="text"
                  :reduce="passenger => String(passenger.value)"
                  :options="passengers"
                />
              </div>

              <div class="form-group">
                <label>{{ $t('drive_form.description') }}</label>
                <input
                  type="text"
                  v-model="drive.description"
                  @input="syncToLocalStorage"
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
                  @input="syncToLocalStorage"
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
                  @input="syncToLocalStorage"
                  name="endMileage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['endMileage'] }"
                >
              </div>
              <div
                class="form-group col-xs-12"
              >{{ $t('drive_form.distance_traveled', { distance: distance }) }}</div>

              <b-alert
                class="col-xs-12"
                variant="success"
                dismissible
                :show="confirmationOnline"
                @dismissed="confirmationOnline=false"
              >
                <b>{{ $t('drive_form.drive_added_online_notification') }}</b>
              </b-alert>
              <b-alert
                class="col-xs-12"
                variant="secondary"
                dismissible
                :show="confirmationOffline"
                @dismissed="confirmationffline=false"
              >
                <b>{{ $t('drive_form.drive_added_offline_notification') }}</b>
              </b-alert>

              <div class="form-group">
                <button class="btn btn-primary col-xs-3">{{ $t('drive_form.submit') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import vSelect from 'vue-select';

import 'vue-select/dist/vue-select.css';

import * as actions from '../store/actions';
import {
  isErroring,
  makeErrors,
  stringFields,
  makeFormState,
} from './services';
import {
  namespaces,
  actions as apiActions,
  IS_ONLINE,
} from '../store/constants';
import { FORM_STATE } from '../constants/form';
import { setItem, removeItem } from '../services/localStore';

export default {
  name: 'DriveFormView',
  components: { vSelect },
  data() {
    return {
      drive: makeFormState(),
      errors: {},
      searchText: '',
      confirmationOnline: false,
      confirmationOffline: false,
      currentDate: new Date().toISOString().split('T')[0],
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),
    ...mapActions(namespaces.cars, [apiActions.fetchCars]),
    ...mapActions(namespaces.passengers, [apiActions.fetchPassengers]),
    ...mapActions(namespaces.projects, [apiActions.fetchProjects]),
    handleSubmit() {
      this.validateForm();
      this.confirmationOffline = false;
      this.confirmationOnline = false;

      if (!Object.keys(this.errors).length) {
        this[actions.SUBMIT]({
          form: {
            ...this.drive,
            passengers: [this.drive.passenger],
            timestamp: Math.floor(Date.now() / 1000),
          },
        });
        removeItem(FORM_STATE);
        setItem(FORM_STATE, { car: this.drive.car });
        this.drive = makeFormState();

        if (this.isOnline) {
          this.confirmationOnline = true;
        } else {
          this.confirmationOffline = true;
        }
      }
    },
    syncToLocalStorage() {
      localStorage.setItem(FORM_STATE, JSON.stringify(this.drive));
    },

    validateForm() {
      const makeErrorsPartial = makeErrors(this.$t.bind(this));

      const data = Object.entries(this.drive).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: stringFields.includes(key) ? String(value).trim() : value,
        }),
        {},
      );

      this.errors = Object.keys(data)
        .filter(isErroring(data))
        .reduce(makeErrorsPartial, {});

      const { startMileage, endMileage } = data;
      if (
        !!startMileage &&
        !!endMileage &&
        parseInt(startMileage, 10) >= parseInt(endMileage, 10)
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
      passengers: state =>
        (state.data || []).map(p => ({
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
@import '../scss/base';

.error::first-letter {
  text-transform: capitalize;
}

.wrapper {
  @include m(2);
}

.select {
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  -webkit-transition:
    border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition:
    border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
</style>
