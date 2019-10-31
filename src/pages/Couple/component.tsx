import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { Device as DeviceModel, Place as PlaceModel } from '../../models';

// components
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet-async';

import Device from './widgets/Device';
import Place from './widgets/Place';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      flex: 1,
    },
  }),
);

export interface Props {
  device?: DeviceModel,
  deviceLoading: boolean,
  place?: PlaceModel,
  placeLoading: boolean,
}

const CouplePage: React.FC<Props> = (props) => {
  const layoutCss = useStyles();

  return (
    <>
      <Helmet>
        <title>Couple</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid className={layoutCss.block} item>
          <Device
            device={props.device}
            idPrefix="device"
            loading={props.deviceLoading}
          />
        </Grid>
        <Grid className={layoutCss.block} item>
          <Place
            place={props.place}
            idPrefix="place"
            loading={props.placeLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CouplePage;
