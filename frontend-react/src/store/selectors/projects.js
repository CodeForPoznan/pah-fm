import { createSelector } from 'reselect';

import { REQUEST_STATUSES } from '../../utils/constants';

const projectsSelector = state => state.projects;

export const getProjectsListSelector = createSelector(
  projectsSelector,
  projects => projects.list
);

export const getProjectsIsLoadingSelector = createSelector(
  projectsSelector,
  projects => projects.status === REQUEST_STATUSES.LOADING
);
