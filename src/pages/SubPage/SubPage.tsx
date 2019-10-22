import React from 'react';
import { Helmet } from 'react-helmet-async';

// components
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from './SubPageStyles';

const Home: React.FC = () => {
  const classes = {
    ...useStyles(),
  };

  return(
    <>
      <Helmet>
        <title>Home | SubPage</title>
      </Helmet>

      <Typography variant="h3" className={classes.notImplemented}>
        SubPage
      </Typography>
    </>
  );
};

export default Home;
