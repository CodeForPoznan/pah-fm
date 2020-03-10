<template>
  <main-form :title="$t('common.confirm_drive')" @submit="handleSubmit">
    <div class="form-group">
      <label for="driveHash">{{ $t('drive_form.drive_hash') }}</label>
      <input
        id="driveHash"
        type="text"
        :value="drive_hash"
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
        class="passenger-input"
      />
    </div>
    <b-alert
      class="col-xs-12"
      variant="success"
      dismissible
      :show="confirmationOnline"
      @dismissed="confirmationOnline = false"
    >
      <b>{{ $t('drive_form.drive_added_online_notification') }}</b>
    </b-alert>
    <b-alert
      class="col-xs-12"
      variant="secondary"
      dismissible
      :show="confirmationOffline"
      @dismissed="confirmationOffline = false"
    >
      <b>{{ $t('drive_form.drive_added_offline_notification') }}</b>
    </b-alert>
    <b-alert
      class="col-xs-12"
      variant="warning"
      dismissible
      :show="(confirmationOnline || confirmationOffline) && !isVerified"
    >
      <b>{{ $t('drives.unverified_drive') }}</b>
    </b-alert>
  </main-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import FormMixin from '../mixins/FormMixin';
import GroupGuardMixin from '../mixins/GroupGuardMixin';
import SignatureInput from '../components/SignatureInput.vue';
import MainForm from '../components/MainForm.vue';
import store, { DRIVE_HASH, DRIVE_FORM } from '../store';
import { namespaces, actions, IS_ONLINE } from '../store/constants';
import { SUBMIT } from '../store/actions';
import { FORM_STATE } from '../constants/form';
import { setItem } from '../services/localStore';
// import router, { driveCreateRoute } from '../router';

import '../scss/passenger.scss';

import { verify } from '../services/crypto';

const initialFormData = {
  signature: '',
};

export default {
  name: 'DriveVerifyView',
  mixins: [FormMixin, GroupGuardMixin],
  components: { MainForm, SignatureInput },
  created() {
    this[actions.fetchPassengers]();
    this.loadFormData(initialFormData);
  },
  data() {
    return {
      formId: 'driveVerifyForm',
      requiredFields: ['signature'],
      initialData: initialFormData,
      isVerified: false,
      confirmationOnline: false,
      confirmationOffline: false,
    };
  },
  methods: {
    ...mapActions(namespaces.passengers, [actions.fetchPassengers]),
    handleSubmit() {
      this.validateForm();
      this.confirmationOffline = false;
      this.confirmationOnline = false;
      const passenger = this.passengers.find(
        (p) => p.value.toString() === this.drive_form.passenger
      );
      this.isVerified = verify(
        this[DRIVE_HASH],
        this.form.signature || 0,
        passenger.rsaPubE,
        passenger.rsaModulusN
      );
      store.dispatch(SUBMIT, {
        form: {
          ...this.drive_form,
          ...this.form,
          isVerified: this.isVerified,
          passengers: [this.drive_form.passenger],
          timestamp: Math.floor(Date.now() / 1000),
        },
      });
      this.clearStorage();
      setItem(FORM_STATE, { car: this.drive_form.car });

      if (this.isOnline) {
        this.confirmationOnline = true;
      } else {
        this.confirmationOffline = true;
      }
      this.reset();
      // router.push(driveCreateRoute);
    },
  },
  computed: {
    ...mapState([DRIVE_FORM, DRIVE_HASH]),
    ...mapState(namespaces.passengers, {
      passengers: (state) =>
        (state.data || []).map((p) => ({
          value: p.id,
          text: [p.firstName, p.lastName].join(' '),
          rsaModulusN: p.rsaModulusN,
          rsaPubE: p.rsaPubE,
        })),
    }),
    ...mapGetters([IS_ONLINE]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/drive') {
      return next();
    }
    return next({ path: '/drive' });
  },
};
</script>
