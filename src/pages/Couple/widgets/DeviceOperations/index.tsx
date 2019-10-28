import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import faker from 'faker';
import React from 'react';

import { useLocalization } from '../../../../utils/localization';

// components
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import SearchableSelect from '../../../../components/SearchableSelect';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {}

const ITEMS = [...new Array(10)].map(() => {
  const id = faker.random.alphaNumeric(8);
  return { label: id, value: id };
});

export const useOperationsStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      margin: theme.spacing(0, 1),
    },
  }),
);

const DeviceOperations: React.FC<Props> = () => {
  const infoCss = useInfoBlockStyles();
  const operationsCss = useOperationsStyles();
  const t = useLocalization();
  const tOperations = t.deviceManagement.device.operations;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {tOperations.sectionTitle}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Grid alignItems="center" container>
          <Button className={infoCss.field} variant="contained">
            {tOperations.unbind}
          </Button>

          <Divider
            className={operationsCss.divider}
            orientation="vertical"
          />

          <SearchableSelect
            getInputProps={() => ({
              label: tOperations.replace.deviceIdField.label,
              placeholder: tOperations.replace.deviceIdField.placeholder,
            })}
            getRootProps={() => ({ className: infoCss.field })}
            items={ITEMS}
          />

          <Button className={infoCss.field} variant="contained">
            {tOperations.replace.action}
          </Button>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default DeviceOperations;
