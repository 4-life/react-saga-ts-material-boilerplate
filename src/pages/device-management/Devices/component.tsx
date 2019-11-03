import React from 'react';

import { Device } from '../../../models';
import { devicePath } from '../../../routing/routes/device-management';
import { useLocalization } from '../../../utils/localization';

// components
import MuiLink from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import Link from '../../../components/Link';

type Props = {
  devices: Device[],
  devicesLoading: boolean,
};

const Devices: React.FC<Props> = (props) => {
  const t = useLocalization();
  
  if (props.devicesLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );
  }
  
  if (!props.devices.length) {
    return (
      <Typography variant="h3">
        {t.deviceManagement.devices.notFound}
      </Typography>
    );
  }

  return (
    <List>
      {props.devices.map((device) => (
        <ListItem key={device.device_id}>
          <MuiLink component={Link} to={devicePath(device.device_id)}>
            {device.device_id}
          </MuiLink>
        </ListItem>
      ))}
    </List>
  );
};

export default Devices;
