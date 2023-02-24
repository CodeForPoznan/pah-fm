import PropTypes from 'prop-types';
import {
  Grid,
  Container,
} from '@material-ui/core';

const Page = ({
  children,
}) => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
  >
    <Container maxWidth="sm">
      {children}
    </Container>
  </Grid>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
