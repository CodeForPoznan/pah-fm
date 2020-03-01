<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <h2>Confirmation code</h2>
            <div class="form-group">
              <input
                id="signature"
                type="text"
                name="signature"
                class="form-control passenger-input"
                :value="computeSignature()"
                readonly
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import GroupGuardMixin from '../mixins/GroupGuardMixin';

import '../scss/passenger.scss';
import { GET_HASH } from '../store/constants';
import { sign } from '../services/crypto';
import { USER } from '../store';
import { padWithZeros as pad } from '../utils';

export default {
  mixins: [GroupGuardMixin],
  beforeRouteEnter(to, from, next) {
    // TODO: Check if code is in Vuex
    if (from.path === '/passenger') {
      return next();
    }
    return next({ path: '/passenger' });
  },
  computed: {
    ...mapState([USER]),
    ...mapGetters([GET_HASH]),
  },
  methods: {
    computeSignature() {
      return pad(sign(this.getHash, this.user.rsaPrivD, this.user.rsaModulusN), 6);
    },
  },
};
</script>
