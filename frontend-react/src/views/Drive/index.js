import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Page from '../../components/Page';

import useT from '../../utils/translation';

import { getCars } from '../../store/slices/cars';
import { getPassengers } from '../../store/slices/passengers';
import { getProjects } from '../../store/slices/projects';

import { getCarsListSelector } from '../../store/selectors/cars';
import { getPassengersListSelector } from '../../store/selectors/passengers';
import { getProjectsListSelector } from '../../store/selectors/projects';

import DriveForm from './components/DriveForm';

const DriveView = () => {
  const dispatch = useDispatch();
  const title = useT('Add new drive');

  const cars = useSelector(getCarsListSelector);
  const passengers = useSelector(getPassengersListSelector);
  const projects = useSelector(getProjectsListSelector);

  useEffect(() => {
    dispatch(getCars());
    dispatch(getPassengers());
    dispatch(getProjects());
  }, []);

  return (
    <Page title="Drive">
      <Typography
        variant="h2"
        component="h2"
      >
        {title}
      </Typography>
      <DriveForm
        cars={cars}
        projects={projects}
        passengers={passengers}
      />
    </Page>
  );
};

export default DriveView;
