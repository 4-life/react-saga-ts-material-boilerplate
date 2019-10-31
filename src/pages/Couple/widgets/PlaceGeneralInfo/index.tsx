import clsx from 'clsx';
import faker from 'faker';
import React from 'react';

import { Place } from '../../../../models';
import { combineIds } from '../../../../utils/ids';
import { useLocalization } from '../../../../utils/localization';
import { formatDateTime } from '../../../../utils/datetime';
import { PlaceFormFieldNames as Fields } from '../Place/utils';

// components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldSkeleton } from '../../../../components/Skeleton';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  place?: Place,
  idPrefix?: string,
};

const BATCH_ID = faker.address.city();

const PlaceGeneralInfo: React.FC<Props> = (props) => {
  const { place } = props;

  const infoCss = useInfoBlockStyles();
  const t = useLocalization();
  const tGeneral = t.deviceManagement.place.general;

  const geoLatFieldId = combineIds(props.idPrefix, Fields.GEO_LAT);
  const batchFieldId = combineIds(props.idPrefix, Fields.BATCH);
  const groupFieldId = combineIds(props.idPrefix, Fields.GROUP);

  if (!place) {
    return <FieldSkeleton className={infoCss.field} />;
  }

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {tGeneral.sectionTitle}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <FormGroup className={infoCss.fields}>
          <FormGroup className={clsx(infoCss.fields, infoCss.fieldGroup)}>
            <InputLabel className={infoCss.field} htmlFor={geoLatFieldId}>
              {tGeneral.geo.sectionTitle}
            </InputLabel>

            <FormGroup className={infoCss.fields} row>
              <TextField
                className={infoCss.field}
                disabled
                id={geoLatFieldId}
                label={tGeneral.geo.latitude}
                value={place.lat}
              />

              <TextField
                className={infoCss.field}
                disabled
                label={tGeneral.geo.longitude}
                value={place.lon}
              />
            </FormGroup>
          </FormGroup>

          {/* TODO: implement as a counter field instead? */}
          <TextField
            className={infoCss.field}
            disabled
            label={tGeneral.level}
            type="number"
            value={place.level}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={tGeneral.creationDate}
            value={
              place.creation_date &&
              formatDateTime(place.creation_date.toISOString())
            }
          />

          {/* TODO: implement as a counter field instead? */}
          <TextField
            className={infoCss.field}
            disabled
            label={tGeneral.groupInnerId}
            type="number"
            value={place.group_inner_id}
          />

          <FormControl
            className={infoCss.field}
            disabled
          >
            <InputLabel htmlFor={groupFieldId}>
              {tGeneral.group}
            </InputLabel>
            <Select
              inputProps={{ id: groupFieldId }}
              value={place.group_id}
            >
              {/* TODO: replace `[place.group_id]` with real group ids */}
              {[place.group_id].map(groupId => (
                <MenuItem key={groupId} value={groupId}>
                  {/* TODO: show the group's name instead of its id? */}
                  {groupId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            className={infoCss.field}
            disabled
          >
            <InputLabel htmlFor={batchFieldId}>
              {tGeneral.batch}
            </InputLabel>
            <Select
              inputProps={{ id: batchFieldId }}
              value={BATCH_ID}
            >
              {/* TODO: replace `[BATCH_ID]` with real batch ids */}
              {[BATCH_ID].map(groupId => (
                <MenuItem key={groupId} value={groupId}>
                  {/* TODO: show the batch's name instead of its id? */}
                  {groupId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className={infoCss.field}
            disabled
            label={tGeneral.customId}
            value={place.custom_id}
          />

          <TextField
            className={infoCss.field}
            disabled
            label={tGeneral.networkId}
            value={place.network_id}
          />
        </FormGroup>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default PlaceGeneralInfo;
