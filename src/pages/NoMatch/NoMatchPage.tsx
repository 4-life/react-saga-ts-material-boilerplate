import React from 'react';
import { Helmet } from 'react-helmet';

// components
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const NoMatchPage: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Not found</title>
      </Helmet>

      <Typography variant="h1">
        Page not found
      </Typography>
      <Link to={'/'}>Home</Link>
    </div>
  );
};

export default NoMatchPage;
