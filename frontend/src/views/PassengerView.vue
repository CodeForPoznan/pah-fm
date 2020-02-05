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
        id="hash"
        name="hash"
        type="text"
        pattern="[0-9]{6}"
        inputmode="numeric"
        maxlength="6"
        @change="syncToLocalStorage"
        v-model="form.hash"
        onkeypress="return event.key === 'Enter'
                      || event.key === 'Backspace'
                      || (Number(event.key) >= 0
                      && Number(event.key) <= 9
                      && event.target.value < 20000000)"
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
      if (this.form.hash.length !== 6) {
        this.isInvalid.hash = true;
        return [this.$t('passenger_form.invalid_length')];
      }
      return [];
    },
  },
};
</script>
