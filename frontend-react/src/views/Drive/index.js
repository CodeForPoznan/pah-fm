import { Typography } from '@material-ui/core';

import Page from '../../components/Page';

import useT from '../../utils/translation';

import DriveForm from './components/DriveForm';

const DriveView = () => {
  const title = useT('Add new drive');

  return (
    <Page title="Drive">
      <Typography
        variant="h2"
        component="h2"
      >
        {title}
      </Typography>
      <DriveForm />
    </Page>
  );
};

export default DriveView;
