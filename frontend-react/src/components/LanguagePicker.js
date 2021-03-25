import React from 'react';
import Flag from 'react-world-flags';
import {useLanguages, setLocale} from '../utils/translation';

const specialFlags = {
  en: 'GB',
  ku: 'IQ',
}

const getFlagCode = (langCode) => {
  if (langCode in specialFlags) {
    return specialFlags[langCode];
  }

  // not specified explicitly, try to guess
  return langCode.split('_').pop().toUpperCase();
}

const LanguagePicker = () => (
  <>
    {useLanguages().map(({ code, localized_name }) => (
      <button key={code} onClick={() => setLocale(code)}>
        <Flag code={getFlagCode(code)} width={60} height={90}/>
        <div>{localized_name}</div>
      </button>
    ))}
  </>
);

export default LanguagePicker;
