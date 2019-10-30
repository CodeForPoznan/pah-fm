import { splitCamelCase } from '../services/splitCamelCase';
import { getToday } from '../services/time';
import { getItem, removeItem } from '../services/localStore';

function isValid(requiredFields, form, field) {
  return requiredFields.includes(field) && form[field] && !!form[field].trim();
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
    validateForm(validator = undefined) {
      this.isInvalid = {};
      this.listOfErrors = [];

      this.listOfErrors = this.requiredFields.reduce((acc, field) => {
        const isInvalid = !isValid(this.requiredFields, this.form, field);

        this.isInvalid[field] = isInvalid;

        return isInvalid ? [...acc, this.getErrorMessage(field)] : acc;
      }, []);

      if (validator) {
        this.listOfErrors.push(...validator(this.form));
      }
    },
    loadFormData(initialData) {
      this.form = loadStateFromStorage(this.formId) || initialData;
    },
    clearStorage() {
      removeItem(this.formId);
    },
  },
};
