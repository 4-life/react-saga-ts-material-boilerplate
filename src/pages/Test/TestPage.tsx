import React from 'react';
import { Helmet } from 'react-helmet';

// components
import { Test } from '../../components';
import { Typography } from '@material-ui/core';

// styles
import contentStyles from '../../styles';
import useStyles from './TestStyle';

const TestPage: React.FC = () => {
  const classes = {
    ...contentStyles(),
    ...useStyles(),
  };

  return (
    <div>
      <Helmet>
        <title>Counter</title>
      </Helmet>

      <Typography variant="h4" className={classes.testStyles}>
        Counter
      </Typography>

      <Test />
    </div>
  );
};

export default TestPage;
