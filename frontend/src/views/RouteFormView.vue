<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <div
              class="alert alert-danger"
              v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li
                  v-for="error in errors"
                  :key="error">{{ error }}</li>
              </ul>
            </div>
            <h2>Add New Route</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  v-model="route.date"
                  name="date"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.date }"
                >
              </div>
              <div class="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  v-model="route.description"
                  name="description"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.description }"
                >
              </div>
              <div class="form-group">
                <label>From:</label>
                <input
                  type="text"
                  v-model="route.from"
                  name="from"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.from }"
                >
              </div>
              <div class="form-group">
                <label>Destination:</label>
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
                  <label>Starting Mileage:</label>
                  <input
                    type="number"
                    v-model="route.startMileage"
                    name="startMileage"
                    class="form-control"
                    :class="{ 'is-invalid': isSubmitted && !route.startMileage }"
                  >
                </div>
                <div class="form-group col-sm-6">
                  <label>Ending Mileage:</label>
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
                >Submit</button>
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

const defaultFormState = {
  id: uuidv4(),
  date: '',
  description: '',
  from: '',
  destination: '',
  startMileage: '',
  endMileage: '',
  isSynced: '',
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
  computed: {
    ...mapState(['routes']),
  },
  methods: {
    ...mapActions([actions.SUBMIT]),

    handleSubmit() {
      this.validateForm();
      this.isSubmitted = true;

      if (!this.errors.length) {
        this[actions.SUBMIT]({ form: this.route, routes: this.routes });
        this.route = { ...defaultFormState };
        this.isSubmitted = false;
      }
    },

    validateForm() {
      const { route } = this;

      this.errors = Object.keys(route)
        .filter(isErroring(route))
        .map(makeErrorMessage);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../scss/base";

  .jumbotron {
    @include my(4);
  }
</style>

