import i18n from './lang';

export const splitCamelCase = label => label.replace(/([a-z])([A-Z])/g, '$1 $2');

/*
 * Compose error message for invalid field in user language.
 */
export const renderErrorMessage = field => i18n.t('drive_form.validation_error', {
  field: splitCamelCase(field),
});
