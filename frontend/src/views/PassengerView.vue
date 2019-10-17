<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <error-list
              v-if="errors.length"
              :errors="errors" />
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
                >
              </div>
              <div class="form-group">
                <button class="btn btn-primary col-xs-3">
                  {{ //TODO
                  $t('.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorList from '../components/ErrorList.vue';

export default {
  name: 'PassengerView',
  components: { ErrorList },
  data() {
    return {
      formId: 'passengerForm',
      form: {},
      errors: {},
    };
  },
  methods: {
    syncToLocalStorage() {
      localStorage.setItem(this.formId, JSON.stringify(this.form));
    },
    handleSubmit() {},
    validateForm() {},
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/base';

.wrapper {
  @include m(2);
}
</style>
