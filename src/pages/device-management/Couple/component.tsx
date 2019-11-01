import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { Device as DeviceModel, Place as PlaceModel } from '../../../models';
import { useLocalization } from '../../../utils/localization';

// components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet-async';

import Device from './widgets/Device';
import Place from './widgets/Place';

// styles
import useHomeStyles from '../../Home/HomeStyles';

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
  const homeCss = useHomeStyles();
  const layoutCss = useStyles();
  const t = useLocalization();

  if (
    !props.device && !props.deviceLoading &&
    !props.place && !props.placeLoading
  ) {
    return (
      <Typography variant="h4" className={homeCss.notImplemented}>
        {t.deviceManagement.couple.notFound}      
      </Typography>
    );
  }

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
