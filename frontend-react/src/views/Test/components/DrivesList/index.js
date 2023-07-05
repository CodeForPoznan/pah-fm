import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import { mockDrives } from './mockItems';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '80%',
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  verified: {
    background: 'linear-gradient(90deg, #28a745 1%, #FAF9F6 0%)',
  },
  unverified: {
    background: 'linear-gradient(90deg, #ffc107 1%, #FAF9F6 0%)',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const totalMilage = () => {
  let milage = 0;

  mockDrives.map((drive) => {
    milage += drive.diff_mileage * 1;

    return milage;
  });

  return milage;
};

export default function DrivesList() {
  const classes = useStyles();
  const [
    page,
    setPage,
  ] = useState(1);
  const [
    expanded,
    setExpanded,
  ] = useState();

  const handlePageChange = (e, p) => {
    setPage(p);
    setExpanded();
  };
  const handleAccordionChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const recordsPerPage = 10;
  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const sliced = mockDrives.slice(indexOfFirstRecord, indexOfLastRecord);
  const numberOfPages = Math.ceil(Object.entries(mockDrives).length / recordsPerPage);

  return (
    <div className={classes.root}>
      <p>{`Total milage: ${totalMilage()} km`}</p>
      {sliced.map((drive, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleAccordionChange(index)}
        >
          <AccordionSummary
            className={drive.is_verified === 1 ? classes.verified : classes.unverified}
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
            <Typography component="span">
              <p>
                {`Description: ${drive.description}`}
              </p>
              <p>
                {`With car: ${drive.car__plates}`}
              </p>
              <p>
                {`Passanger: ${drive.passenger}`}
              </p>
              <p>
                {`Project: ${drive.project__title}`}
              </p>
              <p>
                {`Starting milage: ${drive.start_mileage}`}
              </p>
              <p>
                {`Ending milage: ${drive.end_mileage}`}
              </p>
              <p>
                {`Miles ridden: ${drive.diff_mileage}`}
              </p>
              {drive.is_verified === 0 ? (
                <div style={{
                  backgroundColor: '#fff3cd',
                  height: '50px',
                  display: 'flex',
                }}
                >
                  <p style={{
                    color: '#907117',
                    alignContent: 'center',
                    marginLeft: '20px',
                  }}
                  >
                    This drive was not verified,
                    contact with a person from PAH responsible for drives to solve it.
                  </p>
                </div>
              ) : ''}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Pagination
        count={numberOfPages}
        onChange={handlePageChange}
        className={classes.pagination}
      />
    </div>
  );
}
