import React from 'react';
import { Helmet } from 'react-helmet-async';

// components
import Typography from '@material-ui/core/Typography';
import { FlashOff } from '@material-ui/icons';

// styles
import useStyles from './TestPageStyles';

const Home: React.FC = () => {
  const classes = {
    ...useStyles(),
  };

  return(
    <>
      <Helmet>
        <title>Test</title>
      </Helmet>

      <Typography variant="overline" className={classes.notImplemented}>
        <FlashOff /> Page is not implemented
      </Typography>
    </>
  );
};

export default Home;
