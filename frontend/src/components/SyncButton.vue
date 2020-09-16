<template>
  <div
    v-if="!isLogin && user"
    class="col-2 button-container"
  >
    <div v-if="inDrivesView">
      <div v-if="syncStatus === 'untouched'">
        <svg
          class="icon"
          @click="triggerSync"
        >
          <use xlink:href="../assets/sprite.svg#sync-alt" />
        </svg>
      </div>
      <div v-else-if="syncStatus === 'loading'">
        <div class="spinner-border icon" />
      </div>
      <div v-else-if="syncStatus === 'success'">
        <svg class="icon success">
          <use xlink:href="../assets/sprite.svg#success" />
        </svg>
      </div>
      <div v-else-if="syncStatus === 'fail'">
        <svg class="icon fail">
          <use
            xlink:href="../assets/sprite.svg#fail"
            href="../assets/sprite.svg#fail"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { IS_ONLINE, SYNC } from '@/store/constants';
import { USER } from '@/store';
import { mapActions, mapState } from 'vuex';
import { driveListRoute, loginRoute } from '@/router/routes';

export default {
  name: 'SyncButton',
  computed: {
    ...mapState([IS_ONLINE, USER]),
  },
  data() {
    return {
      isLogin: this.$router.currentRoute.path === loginRoute.path,
      inDrivesView: false,
      syncStatus: 'untouched',
      watchingIsOn: false,
    };
  },
  methods: {
    ...mapActions({ sync: SYNC }),
    triggerSync() {
      this.sync();
      this.syncStatus = 'loading';
      this.watchMutation();
    },
    watchMutation() {
      const watching = this.$store.subscribe((mutation) => {
        if (mutation.type === 'drives/setData') {
          this.syncStatus = 'success';
          this.unsubscribe();
        }
      });
      return new Promise((resolve) => {
        setTimeout(() => { resolve(watching()); }, 5000);
      })
        .then(() => {
          if (this.syncStatus !== 'success') {
            this.syncStatus = 'fail';
          }
        })
        .finally(() => {
          setTimeout(() => { this.syncStatus = 'untouched'; }, 3000);
        });
    },
  },
  watch: {
    $route() {
      this.inDrivesView = this.$router.currentRoute.path === driveListRoute.path;
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  padding: 0;
  margin-right: 5px;
  margin-left: auto;
}

.icon {
  width: 40px;
  height: 40px;
}

.success {
  fill: green;
}

.fail {
  fill: red;
}
</style>
