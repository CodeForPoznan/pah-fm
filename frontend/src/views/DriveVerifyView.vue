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
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm();
      let isVerified = verify(
        store.state.DRIVE_HASH,
        this.form.signature || 0,
        passenger.rsaPubE,
        passenger.rsaModulusN
      );
    },
  },
};
</script>
