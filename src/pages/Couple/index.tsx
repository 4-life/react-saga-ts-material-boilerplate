import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import faker from 'faker';
import React from 'react';
import { Helmet } from 'react-helmet-async';

// components
import Grid from '@material-ui/core/Grid';

import Device from './widgets/Device';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      flexGrow: 1,
    },
  }),
);

const DEVICE = {
  device_id: faker.random.alphaNumeric(8),
  protocol: faker.system.semver(),
  firmware: faker.system.semver(),
  device_type: 'Parking sensor',
  activation_status: faker.random.boolean(),
  damaged_status: faker.random.boolean(),
  encryption_keys: [faker.random.uuid()],
  owner: faker.company.companyName(),
};

const CouplePage: React.FC = () => {
  const layoutCss = useStyles();

  return (
    <>
      <Helmet>
        <title>Couple</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid className={layoutCss.block} item>
          <Device device={DEVICE} idPrefix="device" />
        </Grid>
        <Grid className={layoutCss.block} item />
      </Grid>
    </>
  );
};

export default CouplePage;
