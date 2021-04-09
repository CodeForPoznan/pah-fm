import React from 'react';
import { useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import {
  useLanguages,
  setLocale,
} from '../utils/translation';
import { setLocale as setLocaleAction } from '../store/slices/ui';
import {
  Fade,
  List,
  ListItem, ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

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

const useStyles = makeStyles({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    cursor: 'pointer',
  },
});

const LanguagePicker = () => {
  const classes = useStyles();
  const languages = useLanguages();
  const dispatch = useDispatch();

  const changeLocale = (code, rtl) => {
    dispatch(setLocaleAction({ locale: code, rtl }));
    setLocale(code);
  };

  return (
    <List>
      {languages.map(({ code, localized_name, rtl }) => (
        <div key={code} onClick={() => changeLocale(code, rtl)}>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <Flag code={getFlagCode(code)} width={30} height={45}/>
            </ListItemIcon>
            <ListItemText>
              {localized_name}
            </ListItemText>
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default LanguagePicker;
