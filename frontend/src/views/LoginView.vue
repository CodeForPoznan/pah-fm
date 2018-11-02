<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div>
                        <div v-if="loginError" class="alert alert-danger">
                            {{ loginError }}
                        </div>
                        <h2>Login</h2>
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label>Username</label>
                                <input
                                  type="text"
                                  v-model="username"
                                  name="username"
                                  class="form-control"
                                  :class="{ 'is-invalid': submitted && !username }"
                                />
                                <div
                                  v-show="submitted && !username"
                                  class="invalid-feedback"
                                >Username is required</div>
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                  type="password"
                                  v-model="password"
                                  name="password"
                                  class="form-control"
                                  :class="{ 'is-invalid': submitted && !password }"
                                />
                                <div
                                  v-show="submitted && !password"
                                  class="invalid-feedback"
                                >Password is required</div>
                            </div>
                            <div class="form-group">
                                <button
                                  class="btn btn-primary"
                                  :disabled="loginInProgress || !username || !password"
                                >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as actions from '../store/actions';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
    };
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
