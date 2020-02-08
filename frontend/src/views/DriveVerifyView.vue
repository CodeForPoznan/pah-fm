<template>
  <main-form
    :title="$t('common.confirm_drive')"
    :list-of-errors="listOfErrors"
    @submit="handleSubmit"
    @reset="reset"
  >
    <div class="form-group">
      <label for="driveHash">{{ $t('drive_form.drive_hash') }}</label>
      <input
        id="driveHash"
        type="text"
        value="234987"
        class="form-control passenger-input"
        readonly
      />
    </div>
    <div class="form-group">
      <label for="signature">{{ $t('drive_form.signature') }}</label>
      <input
        id="signature"
        name="signature"
        type="text"
        pattern="[0-9]{6}"
        inputmode="numeric"
        maxlength="6"
        class="form-control passenger-input"
      />
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
