import React from 'react';

import { Device } from '../../../../../models';
import { formatDateTime } from '../../../../../utils/datetime';
import { useLocalization } from '../../../../../utils/localization';

// components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldSkeleton } from '../../../../../components/Skeleton';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  device?: Device,
};

const DeviceMonitoring: React.FC<Props> = (props) => {
  const { device } = props;
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();

  if (!device) {
    return <FieldSkeleton className={infoCss.field} />;
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {t.deviceManagement.device.monitoring.sectionTitle}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <FormGroup className={infoCss.fields}>
          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.monitoring.lastReceivedMessageTime}
            value={formatDateTime(device.last_received_message_time)}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.monitoring.numberOfOpenIncidents}
            value={device.number_of_open_incidents}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.monitoring.currentConnectivity}
            value={`${device.current_connectivity}%`}
          />

          {/* TODO: add connectivity history chart */}
        </FormGroup>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default DeviceMonitoring;
