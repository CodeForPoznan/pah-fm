<template>
  <div v-if="!isLogin && user">
    <div v-if="isOnline" class="online" @click="">
      <svg @click="triggerSync" width="2.5em" height="2.5em" viewBox="0 0 16 16" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
        <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
      </svg>
    </div>
    <div v-else class="offline">
      <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-wifi-off" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.706 3.294A12.545 12.545 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404l.785-.785c.63.24 1.228.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.934-.933a6.454 6.454 0 0 1 2.012.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905l.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .048.737.518.518 0 0 1-.668.05 11.496 11.496 0 0 0-1.812-1.07zM9.02 11.78c.238.14.236.464.04.66l-.706.706a.5.5 0 0 1-.708 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.373 0 .722.102 1.02.28zm4.355-9.905a.53.53 0 1 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z"/>
      </svg>
      <p>offline</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { USER } from '../store';
  import { IS_ONLINE, SYNC } from '../store/constants';
  import { loginRoute } from '../router/routes';
  export default {
    name: 'Refresh',
    computed: {
      ...mapState([IS_ONLINE, USER]),
    },
    data() {
      return {
        isLogin: this.$router.currentRoute.path === loginRoute.path,
      };
    },
    methods: {
      ...mapActions({
        sync: SYNC
      }),
      triggerSync() {
        this.sync()
      }
    }
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
  position: fixed;
  width: 36px;
  height: 24px;
  right: 100px;
  top: 30px;
  color: red;
}
</style>
