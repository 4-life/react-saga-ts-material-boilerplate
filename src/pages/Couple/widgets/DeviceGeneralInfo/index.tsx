import clsx from 'clsx';
import React from 'react';

import { Device } from '../../../../models';
import { combineIds } from '../../../../utils/ids';
import { useLocalization } from '../../../../utils/localization';
import { DeviceFormFieldNames as Fields } from '../Device/utils';

// components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  device: Device,
  idPrefix?: string,
};

const DeviceGeneralInfo: React.FC<Props> = (props) => {
  const { device } = props;
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();
  const deviceTypeFieldId = combineIds(props.idPrefix, Fields.DEVICE_TYPE);

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {t.deviceManagement.device.general.sectionTitle}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <FormGroup className={infoCss.fields}>
          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.general.protocol}
            value={device.protocol}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.general.firmware}
            value={device.firmware}
          />

          <FormControl
            className={infoCss.field}
            disabled
          >
            <InputLabel htmlFor={deviceTypeFieldId}>
              {t.deviceManagement.device.general.deviceType.label}
            </InputLabel>
            <Select
              inputProps={{ id: deviceTypeFieldId }}
              value={device.device_type}
            >
              {/* TODO: replace `[device.device_type]` with real device types */}
              {[device.device_type].map(deviceType => (
                <MenuItem key={deviceType} value={deviceType}>
                  {(
                    t.deviceManagement.device.general.deviceType.options[deviceType] ||
                    deviceType
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            className={clsx(infoCss.field, infoCss.field_type_switch)}
            control={
              <Switch
                checked={device.activation_status}
                disabled
              />
            }
            label={t.deviceManagement.device.general.activationStatus}
            labelPlacement="start"
          />

          <FormControlLabel
            className={clsx(infoCss.field, infoCss.field_type_switch)}
            control={
              <Switch
                checked={device.damaged_status}
                disabled
              />
            }
            label={t.deviceManagement.device.general.damagedStatus}
            labelPlacement="start"
          />

          <ExpansionPanel className={infoCss.field}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {t.deviceManagement.device.general.encryptionKeys}
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <List disablePadding>
                {device.encryption_keys.map(key => (
                  <ListItem key={key}>
                    <ListItemText primary={key} />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <TextField
            className={infoCss.field}
            disabled
            label={t.deviceManagement.device.general.owner}
            value={device.owner}
          />
        </FormGroup>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default DeviceGeneralInfo;
