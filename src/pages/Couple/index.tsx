import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import faker from 'faker';
import React from 'react';
import { Helmet } from 'react-helmet-async';

// components
import Grid from '@material-ui/core/Grid';

import Device from './widgets/Device';
import Place from './widgets/Place';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      flex: 1,
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

  last_update_time: faker.date.past().toISOString(),
  last_firmware_update_time: faker.date.past().toISOString(),
  production_batch_id: faker.random.number(),
  assembling_time: faker.date.past().toISOString(),
  purchase_time: faker.date.past().toISOString(),
  warranty_expiration_time: faker.date.past().toISOString(),
  last_disabling_time: faker.date.past().toISOString(),
  last_disabling_reason: faker.lorem.words(20),

  // monitoring information
  last_received_message_time: faker.date.past().toISOString(),
  number_of_open_incidents: faker.random.number({ min: 0, max: 10, precision: 1 }),
  current_connectivity: faker.random.number({ min: 0, max: 100, precision: 1 }),
};

const PLACE = {
  id: faker.random.number(),
  level: faker.random.number({ min: -5, max: 10, precision: 1 }),
  lat: parseFloat(faker.address.latitude()),
  lon: parseFloat(faker.address.longitude()),
  creation_date: faker.date.past(),
  group_id: faker.random.number(),
  group_inner_id: faker.random.number(),
  custom_id: faker.random.alphaNumeric(8),
  network_id: faker.random.uuid(),
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
        <Grid className={layoutCss.block} item>
          <Place place={PLACE} idPrefix="place" />
        </Grid>
      </Grid>
    </>
  );
};

export default CouplePage;
