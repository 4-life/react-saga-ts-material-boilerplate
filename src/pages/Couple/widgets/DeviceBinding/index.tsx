import faker from 'faker';
import React from 'react';

import { useLocalization } from '../../../../utils/localization';
import {
  default as successTheme,
  SUCCESS_PALETTE_NAME,
} from '../../../../styles/themes/success';

// components
import Button from '@material-ui/core/Button';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SearchableSelect from '../../../../components/SearchableSelect';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {}

const ITEMS = [...new Array(10)].map(() => {
  const id = faker.random.alphaNumeric(8);
  return { label: id, value: id };
});

const DeviceBinding: React.FC<Props> = () => {
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();
  const tBinding = t.deviceManagement.device.binding;

  return (
    <Paper>
      <Typography className={infoCss.title} component="h2" variant="h6">
        {tBinding.sectionTitle}
      </Typography>

      <Grid alignItems="center" container>
        <SearchableSelect
          getInputProps={() => ({
            label: tBinding.deviceIdField.label,
            placeholder: tBinding.deviceIdField.placeholder,
          })}
          getRootProps={() => ({ className: infoCss.field })}
          items={ITEMS}
        />

        <ThemeProvider theme={successTheme}>
          <Button
            className={infoCss.button}
            color={SUCCESS_PALETTE_NAME}
            variant="contained"
          >
            {tBinding.action}
          </Button>
        </ThemeProvider>
      </Grid>
    </Paper>
  );
};

export default DeviceBinding;
