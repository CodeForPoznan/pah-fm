<template>
  <main-form
    :title="$t('common.confirm_drive')"
    :list-of-errors="listOfErrors"
    @submit="handleSubmit"
    @reset="reset"
  >
    <div class="form-group">
      <label for="hash">{{ $t('passenger_form.hash') }}</label>
      <input
        type="number"
        @change="syncToLocalStorage"
        v-model.number="form.hash"
        id="hash"
        name="hash"
        max="999999"
        step="1"
        min="0"
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
import store from '../store';

import '../scss/passenger.scss';
import { SET_HASH } from '../store/actions';

const initialFormData = {
  hash: null,
};

export default {
  name: 'PassengerView',
  mixins: [FormMixin, GroupGuardMixin],
  components: { MainForm },
  mounted() {
    this.loadFormData({ ...initialFormData });
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
        store.dispatch(SET_HASH, this.form.hash);
        this.clearStorage();
        this.loadFormData(initialFormData); // re-initialize form
        this.$router.push('/confirm');
      }
    },
    validator() {
      if (String(this.form.hash).length !== 6) {
        this.isInvalid.hash = true;
        return [this.$t('passenger_form.invalid_length')];
      }
      return [];
    },
  },
};
</script>
