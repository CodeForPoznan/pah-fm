import { renderErrorMessage } from '../services/errorMessages';

export function isValid(field) {
  return field && !!String(field).trim();
}

export default {
  data() {
    return {
      isInvalid: {},
      listOfErrors: [],
      form: {},
    };
  },
  methods: {
    reset() {
      this.clearStorage();
      this.loadFormData();
    },
    validateForm(validator = undefined) {
      /**
       * In validator argument you should pass a function that takes `this.form` as argument and
       * returns an array of errors (strings). In that function you also have access to
       * `this.isInvalid` object, in which you can control highlighting of field.
       */
      this.isInvalid = {};
      this.listOfErrors = [];

      this.listOfErrors = this.requiredFields
        .filter((field) => !isValid(this.form[field]))
        .map((field) => {
          this.isInvalid[field] = true;
          return renderErrorMessage(field);
        });

      if (validator) {
        this.listOfErrors.push(...validator(this.form));
      }
    },
    loadFormData() {
      this.form = { ...this.initialData };
    },
    clearStorage() {},
  },
};
