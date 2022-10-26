import {
  makeStyles,
  styled,
} from '@material-ui/styles';
import { Box } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: palette.background.grayLight,
    padding: '4rem 2rem',
    margin: '0.5rem',
    borderRadius: '0.3rem',
  },
  formContainer: {
    minWidth: '60%',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'normal',
    marginBottom: '2rem',
  },
  errorContainer: {
    minWidth: '60%',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    color: palette.errorMessage.fg,
    backgroundColor: palette.errorMessage.bg,
    border: `1px solid ${palette.errorMessage.border}`,
    borderRadius: '.25rem',
  },
  errorTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
  },
}));

export const WhiteBox = styled(Box)({
  backgroundColor: 'white',
  marginBottom: '1.5rem',
  '&:last-of-type': {
    marginBottom: 'unset',
  },
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});
