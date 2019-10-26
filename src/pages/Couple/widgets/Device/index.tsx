import React from 'react';

import { Device as DeviceModel } from '../../../../models';
import { combineIds } from '../../../../utils/ids';
import { resolveArgs, useLocalization } from '../../../../utils/localization';

// components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeviceGeneralInfo from '../DeviceGeneralInfo';
import DeviceBusinessInfo from '../DeviceBusinessInfo';

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

      <DeviceBusinessInfo
        device={props.device}
        idPrefix={combineIds(props.idPrefix, 'business')}
      />
    </Paper>
  );
};

export default Device;
