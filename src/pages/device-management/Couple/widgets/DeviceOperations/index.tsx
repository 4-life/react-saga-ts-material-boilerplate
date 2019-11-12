import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import faker from 'faker';
import React from 'react';

import { useLocalization } from '../../../../../utils/localization';
import {
  default as dangerTheme,
  DANGER_PALETTE_NAME,
} from '../../../../../styles/themes/danger';
import {
  default as warningTheme,
  WARNING_PALETTE_NAME,
} from '../../../../../styles/themes/warning';

// components
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import SearchableSelect from '../../../../../components/SearchableSelect';
import { FieldSkeleton } from '../../../../../components/Skeleton';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  loading: boolean;
}

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

const DeviceOperations: React.FC<Props> = (props) => {
  const infoCss = useInfoBlockStyles();
  const operationsCss = useOperationsStyles();
  const t = useLocalization();
  const tOperations = t.deviceManagement.device.operations;

  if (props.loading) {
    return <FieldSkeleton className={infoCss.field} />;
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {tOperations.sectionTitle}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Grid alignItems="center" container>
          <ThemeProvider theme={dangerTheme}>
            <Button
              className={infoCss.field}
              color={DANGER_PALETTE_NAME}
              variant="contained"
            >
              {tOperations.unbind}
            </Button>
          </ThemeProvider>

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

          <ThemeProvider theme={warningTheme}>
            <Button
              className={infoCss.field}
              color={WARNING_PALETTE_NAME}
              variant="contained"
            >
              {tOperations.replace.action}
            </Button>
          </ThemeProvider>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default DeviceOperations;
