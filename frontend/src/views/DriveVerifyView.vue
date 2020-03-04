<template>
  <main-form :title="$t('common.confirm_drive')" @submit="handleSubmit">
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
      <signature-input
        id="signature"
        name="signature"
        v-model="form.signature"
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
import { FORM_STATE } from '../constants/form';

import '../scss/passenger.scss';

import { hashDict, verify } from '../services/crypto';

const initialFormData = {
  signature: null,
};

export default {
  name: 'DriveVerifyView',
  mixins: [FormMixin, GroupGuardMixin],
  components: { MainForm, SignatureInput },
  mounted() {
    this.loadFormData(initialFormData);
  },
  data() {
    return {
      formId: 'driveVerifyForm',
      requiredFields: ['signature'],
      isVerified: false,
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm();
      this.confirmationOffline = false;
      this.confirmationOnline = false;
      const passenger = this.passengers.find(
        (p) => p.value.toString() === this.form.passenger
      );
      this.isVerified = verify(
        store.state.DRIVE_HASH,
        this.form.signature || 0,
        passenger.rsaPubE,
        passenger.rsaModulusN
      );
      if (!this.form.signature) delete this.form.signature;
      this[actions.SUBMIT]({
        form: {
          ...this.form,
          isVerified: this.isVerified,
          passengers: [this.form.passenger],
          timestamp: Math.floor(Date.now() / 1000),
        },
      });
      this.clearStorage();
      setItem(FORM_STATE, { car: this.form.car });

      if (this.isOnline) {
        this.confirmationOnline = true;
      } else {
        this.confirmationOffline = true;
      }
    },
  },
};
</script>
