import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rtl from 'jss-rtl';
import { create } from 'jss';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';


import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { initTranslations } from './utils/translation';

import theme from './theme';

import './index.css';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ltrTheme = createMuiTheme({ direction: "ltr" });
const rtlTheme = createMuiTheme({ direction: "rtl" });

// const [isRtl, setIsRtl] = React.useState(false);
// React.useLayoutEffect(() => {
//   document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
// }, [isRtl]);
initTranslations();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={rtlTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
