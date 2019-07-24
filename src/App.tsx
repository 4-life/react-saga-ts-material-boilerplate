import React from 'react';
import Amplify from 'aws-amplify';
import Routes from './Routes';
import aws_exports from './aws-exports';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import { withAuthenticator } from 'aws-amplify-react';
import { Footer, Header } from './components';

// styles
import './App.scss';
import contentStyles from './styles';

// AWS configure
Amplify.configure(aws_exports);

const App: React.FC = () => {
  const classes = contentStyles();

  return (
    <Router>
      <div className={classes.root}>

        <Header />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {Routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </main>

        <Footer />

      </div>
    </Router>
  );
};

export default withAuthenticator(App, false);
