import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { counter } from './reducers/counter';
import rootSaga from './sagas/counter-sagas';

import { Container } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/styles';
import outerTheme from './theme';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  counter,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

function render() {
  ReactDOM.render(
    <ThemeProvider theme={outerTheme}>
      <Container maxWidth={false}>
        <Provider store={store}>
          <App />
        </Provider>
      </Container>
    </ThemeProvider>,
    document.getElementById('root') as HTMLElement,
  );
}

render();

// store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
