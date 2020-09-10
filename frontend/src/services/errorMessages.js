import i18n from './lang';

export const splitCamelCase = label => label.replace(/([a-z])([A-Z])/g, '$1 $2');

export const toSnakeCase = label =>
  label.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

/*
 * Compose error message for invalid field in user language.
 */
export const renderErrorMessage = field =>
  i18n.t('form_errors.validation_error', {
    field: splitCamelCase(field),
  });
