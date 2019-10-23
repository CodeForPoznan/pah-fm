import { splitCamelCase } from '../services/splitCamelCase';
import { getToday } from '../services/time';
import { getItem, removeItem } from '../services/localStore';

export default {
  data() {
    return {
      isInvalid: {},
      listOfErrors: [],
      form: {},
    };
  },
  methods: {
    syncToLocalStorage() {
      localStorage.setItem(this.formId, JSON.stringify(this.form));
    },
    isValid(field) {
      return (
        this.requiredFields.includes(field) &&
        this.form[field] &&
        !!this.form[field].trim()
      );
    },
    getErrorMessage(field) {
      return this.$t('drive_form.validation_error', {
        field: splitCamelCase(field),
      });
    },
    validateForm(validator = undefined) {
      this.isInvalid = {};
      this.listOfErrors = [];

      this.listOfErrors = this.requiredFields.reduce((acc, field) => {
        const isInvalid = !this.isValid(field);

        this.isInvalid[field] = isInvalid;

        return isInvalid ? [...acc, this.getErrorMessage(field)] : acc;
      }, []);

      if (validator) {
        this.listOfErrors.push(...validator(this.form));
      }
    },
    loadFormData(initialData) {
      this.form = this.loadStateFromStorage() || initialData;
    },
    loadStateFromStorage() {
      const storageState = getItem(this.formId);
      if (storageState && !storageState.date) {
        return {
          ...storageState,
          date: getToday(),
        };
      }
      return storageState;
    },
    clearStorage() {
      removeItem(this.formId);
    },
  },
};
