import React from 'react';

import { Device } from '../../../../../models';
import { DATETIME_FORMAT, formatDateTime } from '../../../../../utils/datetime';
import { useLocalization } from '../../../../../utils/localization';

// components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDateTimePicker } from '@material-ui/pickers/DateTimePicker';

import { FieldSkeleton } from '../../../../../components/Skeleton';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  device?: Device;
  idPrefix?: string;
}

const DeviceBusinessInfo: React.FC<Props> = (props) => {
  const { device } = props;
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();

  if (!device) {
    return <FieldSkeleton className={infoCss.field} />;
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {t.deviceManagement.device.business.sectionTitle}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <FormGroup className={infoCss.fields}>
          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.lastUpdateTime}
            value={formatDateTime(device.last_update_time)}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.lastFirmwareUpdateTime}
            value={formatDateTime(device.last_firmware_update_time)}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.productionBatchId}
            value={`#${device.production_batch_id}`}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.assemblingTime}
            value={formatDateTime(device.assembling_time)}
          />

          <KeyboardDateTimePicker
            ampm={false}
            className={infoCss.field}
            disabled
            format={DATETIME_FORMAT}
            label={t.deviceManagement.device.business.purchaseTime}
            value={device.purchase_time}
            variant="inline"
            onChange={() => {}}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.warrantyExpirationTime}
            value={formatDateTime(device.warranty_expiration_time)}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.lastDisablingTime}
            value={formatDateTime(device.last_disabling_time)}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.business.lastDisablingReason}
            multiline
            value={device.last_disabling_reason}
          />
        </FormGroup>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default DeviceBusinessInfo;
