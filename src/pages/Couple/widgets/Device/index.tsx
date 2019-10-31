import React from 'react';

import { Device as DeviceModel } from '../../../../models';
import { combineIds } from '../../../../utils/ids';
import { resolveArgs, useLocalization } from '../../../../utils/localization';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FieldSkeleton } from '../../../../components/Skeleton';
import DeviceBinding from '../DeviceBinding';
import DeviceGeneralInfo from '../DeviceGeneralInfo';
import DeviceBusinessInfo from '../DeviceBusinessInfo';
import DeviceMonitoring from '../DeviceMonitoring';
import DeviceOperations from '../DeviceOperations';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  device?: DeviceModel,
  idPrefix?: string,
  loading: boolean,
};

const Device: React.FC<Props> = (props) => {
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();

  const { device, loading } = props;

  if (!device && !loading) {
    return <DeviceBinding />;
  }

  return (
    <Paper className={infoCss.root}>
      {device && !loading
        ? (
          <Typography className={infoCss.title} component="h2" variant="h6">
            {resolveArgs(t.deviceManagement.device.sectionTitle, device)}
          </Typography>
        )
        : <FieldSkeleton className={infoCss.field} />
      }

      <DeviceGeneralInfo
        device={device}
        idPrefix={combineIds(props.idPrefix, 'general')}
      />

      <DeviceOperations
        loading={loading}
      />

      <DeviceBusinessInfo
        device={device}
        idPrefix={combineIds(props.idPrefix, 'business')}
      />

      <DeviceMonitoring device={device} />
    </Paper>
  );
};

export default Device;
