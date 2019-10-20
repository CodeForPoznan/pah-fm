<template>
  <validation-form
    :id="formId"
    :requiredFields="requiredFields"
    :isInvalid="isInvalid"
    v-model="form"
  >
    <div class="form-group">
      <label>
        {{ //TODO
        $t('') }}
      </label>
      <input
        type="text"
        @change="syncToLocalStorage"
        v-model="form.hash"
        name="hash"
        maxlength="6"
        class="form-control"
        :class="{ 'is-invalid': isInvalid.hash }"
      />
    </div>
  </validation-form>
</template>

<script>
import FormMixin from '../mixins/FormMixin';

import ValidationForm from '../components/ValidationForm.vue';

const makeFormState = () => ({
  hash: '',
});

export default {
  name: 'PassengerView',
  mixins: [FormMixin],
  components: { ValidationForm },
  data() {
    return {
      formId: 'passengerForm',
      form: makeFormState(),
      requiredFields: ['hash'],
      isInvalid: {},
    };
  },
};
</script>
