import React from 'react';
import { useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import {
  useLanguages,
  setLocale,
} from '../utils/translation';
import { setLocale as setLocaleAction } from '../store/slices/ui';

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
  
  const changeLocale = (code, rtl) => {
    dispatch(setLocaleAction({ locale: code, rtl }))
    setLocale(code);
  };

  return (
    <>
      {languages.map(({ code, localized_name , rtl}) => (
        <button key={code} onClick={() => changeLocale(code, rtl)}>
          <Flag code={getFlagCode(code)} width={60} height={90}/>
          <div>{localized_name}</div>
        </button>
      ))}
    </>
  );
};

export default LanguagePicker;
