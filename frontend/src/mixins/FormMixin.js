import { splitCamelCase } from '../services/splitCamelCase';
import { getToday } from '../services/time';
import { getItem, removeItem } from '../services/localStore';

function isValid(requiredFields, form, field) {
  return (
    requiredFields.includes(field) &&
    form[field] &&
    !!String(form[field]).trim()
  );
}

function loadStateFromStorage(formId) {
  const storageState = getItem(formId);
  if (storageState && !storageState.date) {
    return {
      ...storageState,
      date: getToday(),
    };
  }
  return storageState;
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
    syncToLocalStorage() {
      localStorage.setItem(this.formId, JSON.stringify(this.form));
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
        .filter((field) => !isValid(this.requiredFields, this.form, field))
        .map((field) => {
          this.isInvalid[field] = true;
          return this.getErrorMessage(field);
        });

      if (validator) {
        this.listOfErrors.push(...validator(this.form));
      }
    },
    loadFormData() {
      this.form = loadStateFromStorage(this.formId) || { ...this.initialData };
    },
    clearStorage() {
      removeItem(this.formId);
    },
  },
};
