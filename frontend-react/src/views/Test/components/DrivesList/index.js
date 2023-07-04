import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { mockDrives } from './mockItems';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function DrivesList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {mockDrives.map((drive, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {drive.date}
              {' '}
              From
              {' '}
              {drive.start_location}
              {' '}
              to
              {' '}
              {drive.end_location}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>
                {'Description: '}
                {drive.description}
              </p>
              <p>
                {'With car: '}
                {drive.car_plates}
              </p>
              <p>
                {'Passenger: '}
                {drive.passenger}
              </p>
              <p>
                {'Project: '}
                {drive.project_title}
              </p>
              <p>
                {'Starting milage: '}
                {drive.start_mileage}
              </p>
              <p>
                {'Ending milage: '}
                {drive.end_mileage}
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
