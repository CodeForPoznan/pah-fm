<template>
  <main-form
    :title="$t('common.confirm_drive')"
    :fields-errors="listOfErrors"
    :other-errors="otherErrors"
    @submit="handleSubmit"
    @reset="reset"
  >
    <div class="form-group">
      <label for="hash">{{ $t('passenger_form.hash') }}</label>
      <signature-input
        id="hash"
        name="hash"
        v-model="form.hash"
        class="passenger-input"
        :class="{ 'is-invalid': isInvalid.hash }"
      />
    </div>
  </main-form>
</template>

<script>
import FormMixin from '../mixins/FormMixin';
import GroupGuardMixin from '../mixins/GroupGuardMixin';
import SignatureInput from '../components/SignatureInput.vue';
import MainForm from '../components/MainForm.vue';
import store from '../store';

import '../scss/passenger.scss';
import { SET_HASH } from '../store/actions';

const initialFormData = {
  hash: null,
};

export default {
  name: 'PassengerView',
  mixins: [FormMixin, GroupGuardMixin],
  components: { MainForm, SignatureInput },
  mounted() {
    this.loadFormData({ ...initialFormData });
  },
  data() {
    return {
      initialData: initialFormData,
      formId: 'passengerForm',
      requiredFields: ['hash'],
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm(this.validator);

      if (!this.listOfErrors.length && !this.otherErrors.length) {
        store.dispatch(SET_HASH, this.form.hash);
        this.clearStorage();
        this.loadFormData(initialFormData); // re-initialize form
        this.$router.push('/confirm');
      }
    },
    validator() {
      if (this.form.hash.length !== 6) {
        this.isInvalid.hash = true;
        return ['passenger_form.invalid_length'];
      }
      return [];
    },
  },
};
</script>
