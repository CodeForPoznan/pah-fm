<template>
  <div
    v-if="!isLogin && user"
    class="col-2 offline"
  >
    <div
      v-if="!isOnline"
      class="offline"
    >
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 16 16"
        class="bi bi-wifi-off"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.706 3.294A12.545 12.545 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404l.785-.785c.63.24 1.228.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.934-.933a6.454 6.454 0 0 1 2.012.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905l.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .048.737.518.518 0 0 1-.668.05 11.496 11.496 0 0 0-1.812-1.07zM9.02 11.78c.238.14.236.464.04.66l-.706.706a.5.5 0 0 1-.708 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.373 0 .722.102 1.02.28zm4.355-9.905a.53.53 0 1 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z" />
      </svg>
    </div>
    <div v-if="isOnline && drivesView && unsyncedDrives.length">
      <div v-if="syncStatus === 'untouched'">
        <svg
          @click="triggerSync"
          width="50px"
          height="50px"
          viewBox="0 0 16 16"
          class="bi bi-arrow-clockwise"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
        </svg>
      </div>
      <div v-else-if="syncStatus === 'loading'">
        <div
          class="spinner-border"
          role="status"
          style="width: 38px; height: 38px;"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="syncStatus === 'success'">
        <svg width="50px" height="50px" viewBox="0 0 16 16" class="bi bi-check2-circle" fill="green" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
        </svg>
      </div>
      <div v-else>
        Fail!!
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { USER } from '../store';
import { IS_ONLINE, SYNC, UNSYNCHRONISED_DRIVES } from '../store/constants';
import { loginRoute, driveListRoute } from '../router/routes';

export default {
  name: 'Refresh',
  computed: {
    ...mapState([IS_ONLINE, USER]),
    ...mapGetters({ unsyncedDrives: UNSYNCHRONISED_DRIVES }),
  },
  data() {
    return {
      isLogin: this.$router.currentRoute.path === loginRoute.path,
      syncStatus: 'untouched',
      drivesView: false,
    };
  },
  watch: {
    $route() {
      if (this.$router.currentRoute.path === driveListRoute.path) {
        this.drivesView = true;
        console.log(this.drivesView);
      } else {
        this.drivesView = false;
      }
    },
  },
  methods: {
    ...mapActions({
      sync: SYNC,
    }),
    triggerSync() {
      this.sync();
      this.syncStatus = 'loading';
      this.$store.subscribe(mutation => {
        if (mutation.type === 'drives/setData') {
          this.syncStatus = 'success';
          setTimeout(() => (this.syncStatus = 'untouched'), 5000);
          console.log(this.syncStatus);
          this.unsubscribe();
        }
      });
      setTimeout(() => (this.syncStatus = 'failed'), 20000)
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/base";

.online {
  position: fixed;
  width: 36px;
  height: 30px;
  right: 100px;
  top: 38px;
  cursor: pointer;
}

.offline {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  position: inherit;
  padding: 0;
  margin-right: 5px;
  margin-left: auto;
}

.icon {
  display: flex;
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
}
</style>
