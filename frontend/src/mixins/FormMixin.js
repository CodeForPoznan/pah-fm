import { splitCamelCase } from '../services/splitCamelCase';

function isValid(requiredFields, form, field) {
  return (
    requiredFields.includes(field) &&
    form[field] &&
    !!String(form[field]).trim()
  );
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
    getErrorMessage(field) {
      return this.$t('drive_form.validation_error', {
        field: splitCamelCase(field),
      });
    },
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
        .filter(field => !isValid(this.requiredFields, this, field))
        .map((field) => {
          this.isInvalid[field] = true;
          return this.getErrorMessage(field);
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
