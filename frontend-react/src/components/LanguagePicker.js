import React from 'react';
import { useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import {
  useLanguages,
  setLocale,
} from '../utils/translation';
import { setLocale as setLocaleAction } from '../store/slices/ui';
import { DIRECTIONS } from '../utils/constants';

const specialFlags = {
  en: 'GB',
  ku: 'IQ',
};

const getFlagCode = (langCode) => {
  if (langCode in specialFlags) {
    return specialFlags[langCode];
  }

  // not specified explicitly, try to guess
  return langCode.split('_').pop().toUpperCase();
};

const LanguagePicker = () => {
  const languages = useLanguages();
  const dispatch = useDispatch();
  
  const changeLocale = code => {
    const { rtl } = languages.find(language => language.code === code);

    dispatch(setLocaleAction({ locale: code, direction: rtl ? DIRECTIONS.RTL : DIRECTIONS.LTR }))
    setLocale(code);
  };

  return (
    <>
      {languages.map(({ code, localized_name }) => (
        <button key={code} onClick={() => changeLocale(code)}>
          <Flag code={getFlagCode(code)} width={60} height={90}/>
          <div>{localized_name}</div>
        </button>
      ))}
    </>
  );
};

export default LanguagePicker;
