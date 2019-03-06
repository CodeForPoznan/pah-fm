<template>

  <div
    v-if="!drives.length && !drives.length"
    class="alert alert-warning m-5"
    role="alert">
    {{ $t('drives.no_driver_drives') }}
  </div>
  <div
    v-else
    class="accordion m-5"
    id="drivesAccordion">

    <h4
      class="heading"
      v-if="unsyncDrives.length"
    >
      {{ $t('drives.unsynced_drives') }}
    </h4>

    <div
      class="card"
      v-for="drive in unsyncDrives"
      :key="drive.id">
      <div
        class="card-header"
        @click="showDrive(drive.id)">
        <h5 class="mb-0">
          <span class="font-weight-bold">{{ drive.date }}</span>
          {{ $t('drives.from_to', { from: drive.startLocation, destination: drive.endLocation}) }}
        </h5>
      </div>
      <div :class="['collapse', { show: driveVisible === drive.id }]">
        <div class="card-body">
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.description') }}</span>
            <span>{{ drive.description }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.car') }}</span>
            <span>{{ drive.car }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.starting_mileage') }}</span>
            <span>{{ drive.startMileage }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.ending_mileage') }}</span>
            <span>{{ drive.endMileage }}</span>
          </p>
        </div>
      </div>
    </div>

    <h4
      class="heading"
      v-if="drives.length"
    >
      {{ $t('drives.synced_drives') }}
    </h4>
    <div
      class="card"
      v-for="drive in drives"
      :key="drive.id">
      <div
        class="card-header"
        @click="showDrive(drive.id)">
        <h5 class="mb-0">
          <span class="font-weight-bold">{{ drive.date }}</span>
          {{ $t('drives.from_to', { from: drive.startLocation, destination: drive.endLocation}) }}
        </h5>
      </div>
      <div :class="['collapse', { show: driveVisible === drive.id }]">
        <div class="card-body">
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.description') }}</span>
            <span>{{ drive.description }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.car') }}</span>
            <span>{{ drive.car }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.starting_mileage') }}</span>
            <span>{{ drive.startMileage }}</span>
          </p>
          <p>
            <span class="font-weight-bold mr-1">{{ $t('drives.ending_mileage') }}</span>
            <span>{{ drive.endMileage }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { actions as apiActions, namespaces } from '../store/constants';
import { UNSYNCRONISED_DRIVES } from '../store';

export default {
  name: 'DrivesView',
  data() {
    return {
      driveVisible: null,
    };
  },
  methods: {
    ...mapActions(namespaces.drives, [apiActions.fetchDrives]),
    showDrive(id) {
      this.driveVisible = id;
    },
  },
  computed: {
    ...mapGetters([UNSYNCRONISED_DRIVES]),
    ...mapState(namespaces.drives, {
      drives: state => state.data || [],
    }),
  },
  created() {
    this[apiActions.fetchDrives]();
  },
};
</script>

<style scoped lang="scss">
.card-header {
  cursor: pointer;
}

.accordion {
  max-height: 300px;
  overflow: auto;
}

.heading {
  text-align: center;
  padding: 10px 0;
}
</style>
