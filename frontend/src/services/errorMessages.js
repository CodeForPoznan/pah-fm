import { i18n } from '../main';

export const splitCamelCase = (label) => label.replace(/([A-Z])/g, ' $1');

/*
 * Compose error message for invalid field in user language.
 * TODO: Test
 */
export const renderErrorMessage = (field) =>
  i18n.t('drive_form.validation_error', {
    field: splitCamelCase(field),
  });
