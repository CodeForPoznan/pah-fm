<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
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
                                />
                                <div
                                  v-show="isSubmitted && !route.date"
                                  class="invalid-feedback"
                                >Date is required</div>
                            </div>
                            <div class="form-group">
                                <label>Reason:</label>
                                <input
                                  type="text"
                                  v-model="route.reason"
                                  name="reason"
                                  class="form-control"
                                  :class="{ 'is-invalid': isSubmitted && !route.reason }"
                                />
                                <div
                                  v-show="isSubmitted && !route.reason"
                                  class="invalid-feedback"
                                >Reason is required</div>
                            </div>
                            <div class="form-group">
                                <label>From:</label>
                                <input
                                  type="text"
                                  v-model="route.from"
                                  name="from"
                                  class="form-control"
                                  :class="{ 'is-invalid': isSubmitted && !route.from }"
                                />
                                <div
                                  v-show="isSubmitted && !route.from"
                                  class="invalid-feedback"
                                >From is required</div>
                            </div>
                            <div class="form-group">
                                <label>Destination:</label>
                                <input
                                  type="text"
                                  v-model="route.destination"
                                  name="destination"
                                  class="form-control"
                                  :class="{ 'is-invalid': isSubmitted && !route.destination }"
                                />
                                <div
                                  v-show="isSubmitted && !route.from"
                                  class="invalid-feedback"
                                >Destination is required</div>
                            </div>
                            <div class="row">
                              <div class="form-group col-sm-6">
                                  <label>Starting Mileage:</label>
                                  <input
                                    type="text"
                                    v-model="route.mileageBefore"
                                    name="mileageBefore"
                                    class="form-control"
                                    :class="{ 'is-invalid': isSubmitted && !route.mileageBefore }"
                                  />
                                  <div
                                    v-show="isSubmitted && !route.mileageBefore"
                                    class="invalid-feedback"
                                  >Starting mileage is required</div>
                              </div>
                              <div class="form-group col-sm-6">
                                  <label>Starting Mileage:</label>
                                  <input
                                    type="text"
                                    v-model="route.mileageAfter"
                                    name="mileageAfter"
                                    class="form-control"
                                    :class="{ 'is-invalid': isSubmitted && !route.mileageAfter }"
                                  />
                                  <div
                                    v-show="isSubmitted && !route.mileageAfter"
                                    class="invalid-feedback"
                                  >Starting mileage is required</div>
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
import { mapActions } from 'vuex';
import uuidv4 from 'uuid/v4';
import * as actions from '../store/actions';


export default {
  name: 'RouteFormView',
  data() {
    return {
      route: {
        id: '',
        date: '',
        reason: '',
        from: '',
        destination: '',
        mileageBefore: '',
        mileageAfter: '',
      },
      isSubmitted: false,
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),
    handleSubmit() {

      this.isSubmitted = true;
      const route = this.route;
      route.id = uuidv4();
      console.log(route);
      this[actions.SUBMIT](route);
    },
  },
};
</script>
