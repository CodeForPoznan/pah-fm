<template>
  <div>
    <main-form
      v-if="!submitted"
      :title="$t('common.confirm_drive')"
      @submit="handleSubmit"
      @skip="submit"
      skippable
    >
      <div class="form-group">
        <label for="driveHash">{{ $t('drive_form.drive_hash') }}</label>
        <input
          id="driveHash"
          type="text"
          :value="NEW_DRIVE_FORM_CHECKSUM"
          class="form-control passenger-input"
          readonly
        >
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
    </main-form>
    <div
      v-else
      class=" jumbotron wrapper"
    >
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
      <b-alert
        class="col-xs-12"
        variant="success"
        dismissible
        :show="(confirmationOnline || confirmationOffline) && isVerified"
      >
        <b>{{ $t('drives.verified_drive') }}</b>
      </b-alert>
      <router-link
        to="/drive"
        class="btn btn-primary"
      >
        {{ $t('common.new_drive') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

import '../scss/passenger.scss';

import FormMixin from '../mixins/FormMixin';
import GroupGuardMixin from '../mixins/GroupGuardMixin';
import SignatureInput from '../components/SignatureInput.vue';
import MainForm from '../components/MainForm.vue';
import { namespaces, actions, IS_ONLINE } from '../store/constants';
import { SUBMIT } from '../store/actions';
// import router, { driveCreateRoute } from '../router';

import {
  NEW_DRIVE_FORM,
  CLEAR_NEW_DRIVE_FORM,
  NEW_DRIVE_FORM_CHECKSUM,
} from '../store/modules/data';

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
      submitted: false,
    };
  },
  methods: {
    ...mapMutations('data', [CLEAR_NEW_DRIVE_FORM]),
    ...mapActions(namespaces.passengers, [actions.fetchPassengers]),
    handleSubmit() {
      if (!this.listOfErrors.length) {
        this.submit();
      }
    },
    submit() {
      this.confirmationOffline = false;
      this.confirmationOnline = false;
      const passenger = this.passengers.find(p => p.value === this[NEW_DRIVE_FORM].passenger);
      this.isVerified = verify(
        this[NEW_DRIVE_FORM_CHECKSUM],
        this.form.signature || 0,
        passenger.rsaPubE,
        passenger.rsaModulusN,
      );
      if (!this.form.signature) delete this.form.signature;

      this.$store.dispatch(SUBMIT, {
        form: {
          ...this[NEW_DRIVE_FORM],
          ...this.form,
          isVerified: this.isVerified,
          passengers: [this[NEW_DRIVE_FORM].passenger],
          timestamp: Math.floor(Date.now() / 1000),
        },
      });
      this.submitted = true;
      this[CLEAR_NEW_DRIVE_FORM]();

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
    ...mapState('data', [NEW_DRIVE_FORM]),
    ...mapGetters('data', [NEW_DRIVE_FORM_CHECKSUM]),
    ...mapState(namespaces.passengers, {
      passengers: state =>
        (state.data || []).map(p => ({
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
