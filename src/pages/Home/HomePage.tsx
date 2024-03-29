import React from 'react';
import { Helmet } from 'react-helmet-async';

// components
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from './HomeStyles';

const Home: React.FC = () => {
  const classes = {
    ...useStyles(),
  };

  return(
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Typography variant="h3" className={classes.notImplemented}>
        Home page
      </Typography>
    </>
  );
};

export default Home;
