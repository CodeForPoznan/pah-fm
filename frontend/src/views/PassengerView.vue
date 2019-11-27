<template>
  <main-form
    :title="$t('common.confirm_drive')"
    :list-of-errors="listOfErrors"
    @submit="handleSubmit"
  >
    <div class="form-group">
      <label>{{ $t('passenger_form.hash') }}</label>
      <input
        type="number"
        @change="syncToLocalStorage"
        v-model="form.hash"
        name="hash"
        maxlength="6"
        class="form-control passenger-input"
        :class="{ 'is-invalid': isInvalid.hash }"
      >
    </div>
  </main-form>
</template>

<script>
import FormMixin from '../mixins/FormMixin';
import GroupGuardMixin from '../mixins/GroupGuardMixin';
import MainForm from '../components/MainForm.vue';

import '../scss/passenger.scss';

const initialFormData = {
  hash: '',
};

export default {
  name: 'PassengerView',
  mixins: [FormMixin, GroupGuardMixin],
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
        // TODO: hash generation
        console.log('run hash generation');

        this.clearStorage();
        this.$router.push('/confirm');
      }
    },
    validator() {
      if (this.form.hash.length !== 6) {
        this.isInvalid.hash = true;
        return [this.$t('passenger_form.length_should_be_6')];
      }
      return [];
    },
  },
};
</script>
