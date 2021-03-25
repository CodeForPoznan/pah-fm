import React from 'react';
import Flag from 'react-world-flags';
import {useLanguages, setLocale} from '../utils/translation';

const flags = {
  ar_IQ: "IQ",
  en: "GB",
  ku: "IQ",
  so: "SO",
  pl_PL: "PL",
  uk_UA: "UA",
}

const LanguagePicker = () => (
  <>
    {useLanguages().map(({ code, localizedName }) => (
      <button key={code} onClick={() => setLocale(code)}>
        <Flag code={flags[code]} width={60} height={90}/>
        {localizedName}
      </button>
    ))}
  </>
);

export default LanguagePicker;
