import { splitCamelCase } from '../services/splitCamelCase';
import { getToday } from '../services/time';
import { getItem } from '../services/localStore';

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
    isErroring(field) {
      return this.requiredFields.includes(field) && !this.form[field].trim();
    },
    getErrorMessage(field) {
      return this.$t('drive_form.validation_error', {
        field: splitCamelCase(field),
      });
    },
    validateForm() {
      this.isInvalid = {};
      this.listOfErrors = [];

      this.listOfErrors = this.requiredFields.reduce((acc, field) => {
        const isInvalid = this.isErroring(field);

        this.isInvalid[field] = isInvalid;

        return isInvalid ? [...acc, this.getErrorMessage(field)] : acc;
      }, []);
    },
    loadFormData(initialData) {
      this.form = this.loadStateFromStorage() || {
        ...initialData,
        date: getToday(),
      };
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
  },
};
