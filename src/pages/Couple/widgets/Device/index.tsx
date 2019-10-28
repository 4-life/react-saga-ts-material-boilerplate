import React from 'react';

import { Device as DeviceModel } from '../../../../models';
import { combineIds } from '../../../../utils/ids';
import { resolveArgs, useLocalization } from '../../../../utils/localization';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DeviceGeneralInfo from '../DeviceGeneralInfo';
import DeviceBusinessInfo from '../DeviceBusinessInfo';
import DeviceMonitoring from '../DeviceMonitoring';
import DeviceOperations from '../DeviceOperations';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  device: DeviceModel,
  idPrefix?: string,
};

const Device: React.FC<Props> = (props) => {
  const { device } = props;
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();

  return (
    <Paper>
      <Typography className={infoCss.title} component="h2" variant="h6">
        {resolveArgs(t.deviceManagement.device.sectionTitle, device)}
      </Typography>

      <DeviceGeneralInfo
        device={props.device}
        idPrefix={combineIds(props.idPrefix, 'general')}
      />

      <DeviceOperations />

      <DeviceBusinessInfo
        device={props.device}
        idPrefix={combineIds(props.idPrefix, 'business')}
      />

      <DeviceMonitoring device={props.device} />
    </Paper>
  );
};

export default Device;
