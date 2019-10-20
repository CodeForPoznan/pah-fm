<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <error-list v-if="listOfErrors.length" :errors="listOfErrors" />
            <h2>Confirm drive</h2>
            <form @submit.prevent="handleSubmit">
              <slot />
              <div class="form-group">
                <button class="btn btn-primary col-xs-3">{{$t('drive_form.submit') }}</button>
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
import { splitCamelCase } from '../services/splitCamelCase';

const makeFormState = () => ({
  hash: '',
});

export default {
  name: 'PassengerView',
  components: { ErrorList },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    isInvalid: {
      type: Object,
      required: true,
    },
    requiredFields: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      form: this.value,
      listOfErrors: [],
    };
  },
  methods: {
    isErroring(field) {
      return this.requiredFields.includes(field) && !this.form[field].trim();
    },
    getErrorMessage(field) {
      return this.$t('drive_form.validation_error', {
        field: splitCamelCase(field),
      });
    },
    handleSubmit() {
      this.validateForm();
    },
    validateForm() {
      this.isInvalid = {};
      this.listOfErrors = [];

      this.listOfErrors = this.requiredFields.reduce((acc, field) => {
        const isInvalid = this.isErroring(field);

        this.isInvalid[field] = isInvalid;

        return isInvalid ? [...acc, this.getErrorMessage(field)] : acc;
      }, []);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/base';

.wrapper {
  @include m(2);
}
</style>