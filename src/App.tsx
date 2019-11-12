import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootState } from './reducers';
import { connect } from 'react-redux';

import { routes as notFoundRoutes } from './routing/routes/not-found';
import { renderRoutes } from './routing/utils/rendering';
import {
  isFetching as isDeviceManagementFetching,
} from './selectors/device-management';

// components
import { Footer, Header, Notifier } from './components';
import { LinearProgress, Fade } from '@material-ui/core';
// styles
import './App.scss';
import contentStyles from './styles';

interface Props {
  isFetching?: boolean;
}

const mapStateToProps = (state: RootState) => ({
  isFetching: isDeviceManagementFetching(state)
});

const Component = (props: Props) => {
  const classes = contentStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Fade in={props.isFetching} timeout={{ appear: 0, exit: 1000 }}>
          <LinearProgress className={classes.loader} color="primary" />
        </Fade>
        <Header />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {renderRoutes({
            getChildRoutes: (route) => {
              if (!route.routes || !route.routes.length) {
                return route.routes;
              }

              return [...route.routes, ...notFoundRoutes];
            },
            getRouteComponent: options => (
              options.route.main ||
              (
                options.route.getRouteComponent &&
                options.route.getRouteComponent(options)
              )
            ),
            routes: Routes,
          })}
        </main>

        <Footer />

        <Notifier />

      </div>
    </Router>
  );
};

export const App: React.FC = connect(mapStateToProps)(Component);
