import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

import { Container } from '@material-ui/core';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';

import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import mainTheme from './styles/themes/main';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HelmetProvider } from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

function render() {
  ReactDOM.render(
    (
      <HelmetProvider>
        <ThemeProvider theme={mainTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container maxWidth={false}>
              <Provider store={store}>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </Provider>
            </Container>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </HelmetProvider>
    ),
    document.getElementById('root') as HTMLElement,
  );
}

render();

// store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
