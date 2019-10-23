<template>
  <main-form
    :title="$t('common.confirm_drive')"
    :list-of-errors="listOfErrors"
    @submit="handleSubmit"
  >
    <div class="form-group">
      <label>{{ $t('passenger_form.hash') }}</label>
      <input
        type="text"
        @change="syncToLocalStorage"
        v-model="form.hash"
        name="hash"
        maxlength="6"
        class="form-control"
        :class="{ 'is-invalid': isInvalid.hash }"
      >
    </div>
  </main-form>
</template>

<script>
import FormMixin from '../mixins/FormMixin';
import MainForm from '../components/MainForm.vue';

const initialFormData = {
  hash: '',
};

export default {
  name: 'PassengerView',
  mixins: [FormMixin],
  components: { MainForm },
  mounted() {
    this.loadFormData(initialFormData);
  },
  data() {
    return {
      formId: 'passengerForm',
      requiredFields: ['hash'],
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm(this.validator);

      if (this.listOfErrors.length === 0) {
        // submit
        console.log('run hash generation');

        this.clearStorage();
        this.loadFormData(initialFormData);
      }
    },
    validator() {
      if (this.form.hash.length !== 6) {
        this.isInvalid.hash = true;
        return ['Hash should be of length 6'];
      }
      return [];
    },
  },
};
</script>
