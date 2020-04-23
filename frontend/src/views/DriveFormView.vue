<template>
  <main-form
    @submit="handleSubmit"
    @reset="CLEAR_NEW_DRIVE_FORM"
    resetable
    :title="$t('common.new_drive')"
    :list-of-errors="listOfErrors"
  >
    <div class="form-group">
      <label>{{ $t('drive_form.date') }}</label>
      <input
        type="date"
        v-model="date"
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
        v-model="startLocation"
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
        v-model.number="startMileage"
        name="startMileage"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['startMileage'] }"
      >
    </div>
    <div class="form-group">
      <label>{{ $t('drive_form.project') }}</label>
      <select
        v-if="projects.data"
        v-model="project"
        name="project"
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
        v-model="car"
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
        v-model="passenger"
        name="passenger"
        class="form-control select"
        :class="{ 'is-invalid': isInvalid['passenger'] }"
        label="text"
        :reduce="(passenger) => passenger.value"
        :options="passengers"
      />
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.description') }}</label>
      <input
        type="text"
        v-model="description"
        name="description"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['description'] }"
      >
    </div>

    <div class="form-group">
      <label>{{ $t('drive_form.end_location') }}</label>
      <input
        type="text"
        maxlength="100"
        v-model="endLocation"
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
        v-model.number="endMileage"
        name="endMileage"
        class="form-control"
        :class="{ 'is-invalid': isInvalid['endMileage'] }"
      >
    </div>
    <div class="form-group col-xs-12">
      {{ $t('drive_form.distance_traveled', { distance: distance }) }}
    </div>
  </main-form>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import { createHelpers } from 'vuex-map-fields';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import MainForm from '../components/MainForm.vue';
import GroupGuardMixin from '../mixins/GroupGuardMixin';
import { renderErrorMessage } from '../services/errorMessages';

import { driveVerifyRoute } from '../router/routes';

import {
  namespaces,
  actions as apiActions,
  IS_ONLINE,
} from '../store/constants';

import {
  newDriveFormInitialState,
  NEW_DRIVE_FORM,
  NEW_DRIVE_FORM_EMPTY_FIELDS,
  CLEAR_NEW_DRIVE_FORM,
} from '../store/modules/data';

const { mapFields } = createHelpers({
  getterType: 'data/getField',
  mutationType: 'data/updateField',
});

export default {
  name: 'DriveFormView',
  components: { vSelect, MainForm },
  mixins: [GroupGuardMixin],
  data() {
    return {
      currentDate: new Date().toISOString().split('T')[0],
      listOfErrors: [],
      isInvalid: {},
    };
  },
  methods: {
    ...mapActions(namespaces.cars, [apiActions.fetchCars]),
    ...mapActions(namespaces.passengers, [apiActions.fetchPassengers]),
    ...mapActions(namespaces.projects, [apiActions.fetchProjects]),
    ...mapMutations('data', [CLEAR_NEW_DRIVE_FORM]),
    handleSubmit() {
      const emptyFields = this[NEW_DRIVE_FORM_EMPTY_FIELDS];
      const mileageErrors = this.checkMileage();
      const noErrors = emptyFields.length === 0 && mileageErrors.length === 0;

      if (noErrors) {
        this.$router.push(driveVerifyRoute);
      } else {
        emptyFields.forEach((field) => (this.isInvalid[field] = true));
        this.listOfErrors = emptyFields
          .map((field) => renderErrorMessage(field))
          .concat(mileageErrors);
      }
    },
    checkMileage() {
      const { startMileage, endMileage } = this;
      if (!!startMileage && !!endMileage && startMileage >= endMileage) {
        const errorStartMileage = this.$t('drive_form.start_mileage_error');
        const errorEndMileage = this.$t('drive_form.end_mileage_error');
        this.isInvalid.startMileage = true;
        this.isInvalid.endMileage = true;
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
    // Mapping form fields with vuex store using vuex-map-fields package
    ...mapFields(Object.keys(newDriveFormInitialState).map(field => `${NEW_DRIVE_FORM}.${field}`)),
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
          rsaModulusN: p.rsaModulusN,
          rsaPubE: p.rsaPubE,
        })),
    }),
    ...mapGetters([IS_ONLINE]),
    ...mapGetters('data', [NEW_DRIVE_FORM_EMPTY_FIELDS]),
    distance() {
      const distance = this.endMileage - this.startMileage;
      return distance > 0 ? distance : 0;
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
