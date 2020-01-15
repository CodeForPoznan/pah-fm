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
                v-model.number="computeSignature"
                class="form-control passenger-input"
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
import GroupGuardMixin from '../mixins/GroupGuardMixin';

import '../scss/passenger.scss';
import { GET_HASH } from "../store/constants";
import {mapGetters, mapState} from "vuex";
import {sign} from "../services/crypto";
import {USER} from "../store";
import {padWithZeros} from "../utils";

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
    getHash: undefined,
    ...mapState([USER]),
    ...mapGetters([GET_HASH]),
    computeSignature() {
      const privKey = {
        d: parseInt(this.user.rsaPrivD, 10),
        n: parseInt(this.user.rsaModulusN, 10)
      };
      return padWithZeros(sign(this.getHash, privKey), 6);
    },
  }
};
</script>
