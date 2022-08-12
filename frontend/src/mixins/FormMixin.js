import { toSnakeCase } from '../services/errorMessages';

export function isValid(field) {
  return field && !!String(field).trim();
}

export default {
  data() {
    return {
      isInvalid: {},
      listOfErrors: [],
      otherErrors: [],
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
      this.otherErrors = [];

      this.listOfErrors = this.requiredFields
        .filter(field => !isValid(this.form[field]))
        .map((field) => {
          this.isInvalid[field] = true;
          return toSnakeCase(field);
        });

      if (validator) {
        this.otherErrors.push(...validator(this.form));
      }
    },
    loadFormData() {
      this.form = { ...this.initialData };
    },
    clearStorage() {},
  },
};
