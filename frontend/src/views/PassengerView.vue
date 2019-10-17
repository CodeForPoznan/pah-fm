<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <error-list v-if="errors.length" :errors="errors" />
            <h2>Confirm drive</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>
                  {{ //TODO
                  $t('') }}
                </label>
                <input
                  type="text"
                  @change="syncToLocalStorage"
                  v-model="form.hash"
                  name="hash"
                  maxlength="6"
                  class="form-control"
                  :class="{ 'is-invalid': errors['hash'] }"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorList from '../components/ErrorList';

import FORM_STATE from '../constants/form';

export default {
  name: 'PassengerView',
  components: { ErrorList },
  data() {
    return {
      form: {},
      errors: {},
    };
  },
  methods: {
    syncToLocalStorage() {
      localStorage.setItem(FORM_STATE, JSON.stringify(this.form));
    },
  },
};
</script>