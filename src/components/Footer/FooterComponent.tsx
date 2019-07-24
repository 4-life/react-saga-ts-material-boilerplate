import React from 'react';

// components
import {
  Typography,
  Container,
} from '@material-ui/core';

// styles
import useStyles from './FooterStyle';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth={false}>
        <Typography variant="body1">Footer</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
