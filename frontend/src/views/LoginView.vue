<template>
  <div>
    <div class="jumbotron wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div
              v-if="loginError"
              class="alert alert-danger"
            >
              {{ loginError }}
            </div>
            <h2>{{ $t('common.login') }}</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="username">{{ $t('login.username') }}</label>
                <input
                  type="text"
                  v-model="username"
                  id="username"
                  name="username"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && !username }"
                >
                <div
                  v-show="submitted && !username"
                  class="invalid-feedback"
                >
                  {{ $t('login.username') }}
                </div>
              </div>
              <div class="form-group">
                <label for="password">{{ $t('login.password') }}</label>
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && !password }"
                >
                <div
                  v-show="submitted && !password"
                  class="invalid-feedback"
                >
                  {{ $t('login.username') }}
                </div>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-primary"
                  :disabled="loginInProgress || !username || !password"
                >
                  {{ $t('common.login') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="language-container">
      <Language />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as actions from '../store/actions';
import Language from '../components/Language.vue';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
    };
  },
  components: {
    Language,
  },
  computed: {
    ...mapState(['user', 'loginInProgress', 'loginError']),
  },
  methods: {
    ...mapActions([actions.LOGIN]),
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this[actions.LOGIN]({ username, password });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base';

.language-container {
  max-width: 300px;
  margin: 0 auto;
}
</style>
