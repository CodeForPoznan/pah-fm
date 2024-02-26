import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { useCallback } from 'react';
import Page from '../../components/Page';

import {
  currentUserRsaPrivDSelector,
  currentUserRsaModulusNSelector,
} from '../../store/selectors/auth';

import useT from '../../utils/translation';
import { sign } from '../../utils/crypto';

import ConfirmForm from './components/ConfirmForm';

const PassengerView = () => {
  const title = useT('Confirm drive');
  const rsaPrivD = useSelector(currentUserRsaPrivDSelector);
  const rsaModulusN = useSelector(currentUserRsaModulusNSelector);

  const generateSignature = useCallback(
    code => new Promise((resolve, reject) => {
      try {
        resolve(String(sign(code, rsaPrivD, rsaModulusN)).padStart(6, '0'));
      } catch (e) {
        reject(e);
      }
    }),
    [
      rsaPrivD,
      rsaModulusN,
    ]
  );

  return (
    <Page title={title}>
      <Typography
        variant="h2"
        component="h2"
      >
        {title}
      </Typography>
      <ConfirmForm onSubmit={generateSignature} />
    </Page>
  );
};

export default PassengerView;
