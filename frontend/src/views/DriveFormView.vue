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
                <label for="date">{{ $t('drive_form.date') }}</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  :max="currentDate"
                  v-model="drive.date"
                  @change="syncToLocalStorage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['date'] }"
                >
              </div>
              <div class="form-group">
                <label for="startLocation">{{ $t('drive_form.start_location') }}</label>
                <input
                  id="startLocation"
                  type="text"
                  name="startLocation"
                  maxlength="100"
                  v-model="drive.startLocation"
                  @input="syncToLocalStorage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['startLocation'] }"
                >
              </div>
              <div class="form-group">
                <label for="startMileage">{{ $t('drive_form.starting_mileage') }}</label>
                <input
                  id="startMileage"
                  type="number"
                  name="startMileage"
                  min="0"
                  v-model.number="drive.startMileage"
                  onkeypress="return event.key === 'Enter'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
                  @input="syncToLocalStorage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['startMileage'] }"
                >
              </div>
              <div class="form-group">
                <label for="project">{{ $t('drive_form.project') }}</label>
                <select
                  id="project"
                  name="car"
                  v-if="projects.data"
                  v-model.number="drive.project"
                  @change="syncToLocalStorage"
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
                <label for="cars">{{ $t('drive_form.cars') }}</label>
                <select
                  id="cars"
                  name="car"
                  v-if="cars.data"
                  v-model.number="drive.car"
                  @change="syncToLocalStorage"
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
                  v-if="!cars.data"
                >{{ $t('drive_form.no_cars_message') }}</p>
              </div>
              <div class="form-group">
                <label for="passenger">{{ $t('drive_form.passenger') }}</label>
                <v-select
                  id="passenger"
                  label="text"
                  name="passenger"
                  v-model.number="drive.passenger"
                  @input="syncToLocalStorage"
                  class="form-control select"
                  :class="{ 'is-invalid': errors['passenger'] }"
                  :reduce="passenger => String(passenger.value)"
                  :options="passengers"
                />
              </div>
              <div class="form-group">
                <label for="description">{{ $t('drive_form.description') }}</label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  v-model="drive.description"
                  @input="syncToLocalStorage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['description']}"
                >
              </div>
              <div class="form-group">
                <label for="endLocation">{{ $t('drive_form.end_location') }}</label>
                <input
                  id="endLocation"
                  type="text"
                  name="endLocation"
                  maxlength="100"
                  @input="syncToLocalStorage"
                  v-model="drive.endLocation"
                  class="form-control"
                  :class="{ 'is-invalid': errors['endLocation'] }"
                >
              </div>
              <div class="form-group">
                <label for="endMileage">{{ $t('drive_form.ending_mileage') }}</label>
                <input
                  id="endMileage"
                  type="number"
                  name="endMileage"
                  min="0"
                  v-model.number="drive.endMileage"
                  onkeypress="return event.key === 'Enter'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
                  @input="syncToLocalStorage"
                  class="form-control"
                  :class="{ 'is-invalid': errors['endMileage'] }"
                >
              </div>
              <div class="form-group">
                <label for="driveHash">{{ $t('drive_form.drive_hash') }}</label>
                <input
                  id="driveHash"
                  v-model.number="computeHash"
                  class="form-control"
                  type="text"
                  readonly
                >
              </div>
              <div class="form-group">
                <label for="signature">{{ $t('drive_form.confirm_hash') }}</label>
                <input
                  id="signature"
                  type="number"
                  name="signature"
                  min="0"
                  maxlength="6"
                  v-model.number="drive.signature"
                  onkeypress="return event.key === 'Enter'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
                  class="form-control"
                  :class="{ 'is-invalid': errors['signature'] }"
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

import { USER } from '../store';
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
import { hashDict } from '../services/crypto';
import { padWithZeros } from '../utils';

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
    ...mapState([USER]),
    ...mapGetters([IS_ONLINE]),
    distance() {
      const distance = this.drive.endMileage - this.drive.startMileage;
      return distance > 0 ? distance : 0;
    },
    computeHash() {
      return padWithZeros(hashDict({
        car: { id: this.drive.car },
        project: { id: this.drive.project },
        passengers: [{ id: this.drive.passenger }],
        startLocation: this.drive.startLocation,
        endLocation: this.drive.endLocation,
        startMileage: this.drive.startMileage,
        endMileage: this.drive.endMileage,
      }), 6);
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
  border: none;
  height: initial;
  padding: 0;
  border-radius: 0.25rem;
}
</style>
