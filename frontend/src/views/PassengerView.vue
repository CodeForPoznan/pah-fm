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
      this.validateForm();

      if (this.listOfErrors === 0) {
        // submit

        this.clearStorage();
        this.loadFormData(initialFormData);
      }
    },
  },
};
</script>
