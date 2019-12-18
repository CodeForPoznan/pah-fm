<template>
  <main-form
    @submit="handleSubmit"
    :title="$t('common.new_drive')"
    :list-of-errors="listOfErrors"
  >
    <div class="form-group">
      <label>{{ $t('drive_form.date') }}</label>
      <input
        type="date"
        @change="syncToLocalStorage"
        v-model="form.date"
        name="date"
        :max="currentDate"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['date'] }"
      >
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.start_location') }}</label>
      <input
        type="text"
        v-model="form.startLocation"
        @input="syncToLocalStorage"
        name="startLocation"
        maxlength="100"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['startLocation'] }"
      >
    </div>
    <div class="form-group">
      <label>{{ $t('drive_form.starting_mileage') }}</label>
      <input
        min="0"
        onkeypress="return event.key === 'Enter'
                      || event.key === 'Backspace'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
        type="number"
        v-model="form.startMileage"
        name="startMileage"
        @input="syncToLocalStorage"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['startMileage'] }"
      >
    </div>
    <div class="form-group">
      <label>{{ $t('drive_form.project') }}</label>
      <select
        v-if="projects.data"
        @change="syncToLocalStorage"
        v-model="form.project"
        name="car"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['project'] }"
      >
        <option
          v-for="project in projects.data"
          :key="project.id"
          :value="project.id"
        >
          {{ project.title }}
        </option>
      </select>
      <p
        class="font-weight-bold"
        v-if="!cars.data"
      >
        {{ $t('drive_form.no_project_message') }}
      </p>
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.cars') }}</label>
      <select
        v-if="cars.data"
        v-model="form.car"
        @change="syncToLocalStorage"
        name="car"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['car'] }"
      >
        <option
          v-for="car in cars.data"
          :key="car.id"
          :value="car.id"
        >
          {{ car.plates }}
        </option>
      </select>
      <p
        class="font-weight-bold"
        v-if="!cars.data"
      >
        {{ $t('drive_form.no_cars_message') }}
      </p>
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.passenger') }}</label>
      <v-select
        v-model="form.passenger"
        name="passenger"
        @input="syncToLocalStorage"
        class="form-control select"
        :class="{ 'is-invalid': isInvalid['passenger'] }"
        label="text"
        :reduce="passenger => String(passenger.value)"
        :options="passengers"
      />
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.description') }}</label>
      <input
        type="text"
        v-model="form.description"
        @input="syncToLocalStorage"
        name="description"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['description']}"
      >
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.end_location') }}</label>
      <input
        type="text"
        maxlength="100"
        @input="syncToLocalStorage"
        v-model="form.endLocation"
        name="endLocation"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['endLocation'] }"
      >
    </div>
    <div class="form-group">
      <label>{{ $t('drive_form.ending_mileage') }}</label>
      <input
        min="0"
        onkeypress="return event.key === 'Enter'
                      || event.key === 'Backspace'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
        type="number"
        v-model="form.endMileage"
        @input="syncToLocalStorage"
        name="endMileage"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['endMileage'] }"
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
      <label for="signature">{{ $t('drive_form.signature') }}</label>
      <input
        id="signature"
        type="number"
        name="signature"
        min="0"
        maxlength="6"
        v-model.number="form.signature"
        onkeypress="return event.key === 'Enter'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['signature'] }"
      >
    </div>
    <div
      class="form-group col-xs-12"
    >
      {{ $t('drive_form.distance_traveled', { distance: distance }) }}
    </div>

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
  </main-form>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import vSelect from 'vue-select';

import 'vue-select/dist/vue-select.css';

import MainForm from '../components/MainForm.vue';
import FormMixin from '../mixins/FormMixin';
import GroupGuardMixin from '../mixins/GroupGuardMixin';

import { USER } from '../store';
import * as actions from '../store/actions';

import {
  namespaces,
  actions as apiActions,
  IS_ONLINE,
} from '../store/constants';
import { FORM_STATE } from '../constants/form';
import { setItem } from '../services/localStore';
import { getToday } from '../services/time';
import { hashDict } from '../services/crypto';
import { padWithZeros } from '../utils';

const initialFormData = {
  date: getToday(),
  car: '',
  description: '',
  startMileage: '',
  endMileage: '',
  project: '',
  passenger: '',
  startLocation: '',
  endLocation: '',
  signature: '',
};

const requiredFields = [
  'date',
  'car',
  'project',
  'startMileage',
  'endMileage',
  'startLocation',
  'endLocation',
  'passenger'
];

export default {
  name: 'DriveFormView',
  components: { vSelect, MainForm },
  mixins: [FormMixin, GroupGuardMixin],
  mounted() {
    this.loadFormData({ ...initialFormData });
  },
  data() {
    return {
      formId: FORM_STATE,
      requiredFields,
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
      this.validateForm(this.validator);
      this.confirmationOffline = false;
      this.confirmationOnline = false;

      if (this.listOfErrors.length === 0) {
        this[actions.SUBMIT]({
          form: {
            ...this.form,
            passengers: [this.form.passenger],
            timestamp: Math.floor(Date.now() / 1000),
          },
        });
        this.clearStorage();
        setItem(FORM_STATE, { car: this.form.car });
        this.loadFormData(initialFormData);

        if (this.isOnline) {
          this.confirmationOnline = true;
        } else {
          this.confirmationOffline = true;
        }
      }
    },
    validator(data) {
      const { startMileage, endMileage } = data;
      if (
        !!startMileage &&
        !!endMileage &&
        parseInt(startMileage, 10) >= parseInt(endMileage, 10)
      ) {
        const errorStartMileage = this.$t('drive_form.start_mileage_error');
        const errorEndMileage = this.$t('drive_form.end_mileage_error');
        return [errorStartMileage, errorEndMileage];
      }
      return [];
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
      const distance = this.form.endMileage - this.form.startMileage;
      return distance > 0 ? distance : 0;
    },
    computeHash() {
      return padWithZeros(hashDict({
        car: { id: this.form.car },
        project: { id: this.form.project },
        passengers: [{ id: this.form.passenger }],
        startLocation: this.form.startLocation,
        endLocation: this.form.endLocation,
        startMileage: this.form.startMileage,
        endMileage: this.form.endMileage,
      }), 6);
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  border: none;
  height: initial;
  padding: 0;
  border-radius: 0.25rem;
}
</style>
