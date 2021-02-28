import React from 'react';
import { tx } from '@transifex/native';
import { useLanguages } from '@transifex/react';
import Flag from 'react-world-flags';

const flags = {
  ar_IQ: "IQ",
  en: "GB",
  ku: "IQ",
  so: "SO",
  pl_PL: "PL",
  uk_UA: "UA",
}

const LanguagePicker = () => {
  const languages = useLanguages();

  return (
    <>
      {languages.map(({ code, name }) => (
        <button key={code} onClick={() => tx.setCurrentLocale(code)}>
          <Flag code={flags[code]} width={60} height={90}/>
          {code} - {name}
        </button>
      ))}
    </>
  );
}

export default LanguagePicker;
