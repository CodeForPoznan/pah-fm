import { useT as txUseT, useLanguages as txUseLanguages } from '@transifex/react';
import { tx, onEvent, LOCALE_CHANGED } from '@transifex/native';

const { REACT_APP_TRANSIFEX_TOKEN: TRANSIFEX_TOKEN } = process.env;

const useLanguages = () => txUseLanguages();
const setLocale = (code) => tx.setCurrentLocale(code);
const useT = (str, props) => txUseT(str, props || {});

class ErrorPolicy {
  handle(error, sourceString, localeCode, params) {
    throw error || new Error(`ERROR TRANSLATING ("${localeCode}"): "${sourceString}"`);
  }
}

class MissingPolicy {
  handle(sourceString, localeCode) {
    return `MISSING TRANSLATION ("${localeCode}"): "${sourceString}"`;
  }
}

const initTranslations = () => {
  onEvent(LOCALE_CHANGED, () => console.log("locale changed!"));

  tx.init({
    sourceLocale: 'en',
    errorPolicy: new ErrorPolicy(),
    missingPolicy: new MissingPolicy(),
    token: TRANSIFEX_TOKEN,
  });
}

/*** NOTE(artur):
  Uh, ok, so the transifex live works now, kind of, but it fetches translations on every page even though 
  it receives all translations anyway, so that's odd... there has to be a way to prefetch translations 
  and keep them in local store some kind of middleware for this? we could load al translations for given 
  user and see how that ends up user could have a language field for his preferred lang so that we won't 
  have to bother with loading other langs.
*/

export {
  useT as default,
  useLanguages,
  setLocale,
  initTranslations,
};
