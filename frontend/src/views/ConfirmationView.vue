<template>
  <div>
    <div v-if="!submissionSuccess">
      <div v-if="verificationToken">
        <div v-if="verificationToken.isActive">
          <div
            v-if="submissionError"
            class="alert alert-danger">
            {{ $t('common.unexpected_error') }}
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group answers">
              <div>
                {{ $t('confirmation.drive_ok_label') }} *
              </div>
              <div>
                <div class="form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="driveOk"
                    id="driveFine"
                    value="yes"
                    v-model="confirmation.ok"
                    :disabled="submissionInProgress()"
                  >
                  <label
                    class="form-check-label"
                    for="driveFine">
                    {{ $t('common.yes') }}
                  </label>
                </div>
                <div class="form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="driveOk"
                    id="driveBad"
                    value="no"
                    v-model="confirmation.ok"
                    :disabled="submissionInProgress()"
                  >
                  <label
                    class="form-check-label"
                    for="driveBad">
                    {{ $t('common.no') }}
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>
                {{ $t('confirmation.comment_label') }} *
              </label>
              <textarea
                v-model="confirmation.comment"
                name="comment"
                class="form-control"
                rows="5"
                maxlength="2000"
                required
                :disabled="submissionInProgress()"
              />
            </div>
            <div class="form-group">
              <button
                class="btn btn-primary"
                :disabled="!formValid() || submissionInProgress()"
              >{{ $t('common.submit') }}
              </button>
            </div>
          </form>
        </div>
        <div
          v-else
          class="alert alert-warning">
          {{ $t('confirmation.token_inactive') }}
        </div>
      </div>
      <div v-else>
        {{ $t('common.loading') }}...
      </div>
    </div>
    <div
      v-else
      class="alert alert-success">
      {{ $t('confirmation.submission_success') }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import * as actions from '../store/actions';
import { VERIFICATION_TOKEN } from '../store/constants';
import * as mutations from '../store/mutations';

export default {
  data() {
    return {
      confirmation: {
        ok: '',
        comment: '',
      },
      submissionError: '',
      submissionSuccess: null,
    };
  },
  name: 'ConfirmationView',
  created() {
    this[actions.VERIFY_CONFIRMATION_TOKEN](this.token);
  },
  computed: {
    ...mapState([VERIFICATION_TOKEN]),
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    ...mapActions([
      actions.VERIFY_CONFIRMATION_TOKEN,
      actions.SUBMIT_CONFIRMATION_TOKEN,
    ]),
    ...mapMutations([
      mutations.SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS,
    ]),
    handleSubmit() {
      const payload = {
        isOk: this.confirmation.ok === 'yes',
        comment: this.confirmation.comment,
      };
      this[mutations.SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS](true);
      this[actions.SUBMIT_CONFIRMATION_TOKEN]({ payload, token: this.token })
        .then(() => {
          this.submissionSuccess = true;
        })
        .catch((err) => {
          this[mutations.SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS](false);
          console.error(`Error submitting confirmation token: ${err}`);
          this.submissionError = err;
        });
    },
    formValid() {
      return (['yes', 'no'].includes(this.confirmation.ok) && this.confirmation.comment);
    },
    submissionInProgress() {
      return this[VERIFICATION_TOKEN] && this[VERIFICATION_TOKEN].inProgress;
    },
  },
};
</script>

<style scoped>
    .answers {
        display: flex;
        justify-content: space-between;
    }
</style>
