import React from 'react';

import { combineIds } from '../../../../utils/ids';
import { useLocalization } from '../../../../utils/localization';
import {
  default as successTheme,
  SUCCESS_PALETTE_NAME,
} from '../../../../styles/themes/success';
import { PlaceFormFieldNames as Fields } from '../Place/utils';

// components
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  idPrefix?: string,
}

const PlaceBinding: React.FC<Props> = (props) => {
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();
  const tBinding = t.deviceManagement.place.binding;

  const batchFieldId = combineIds(props.idPrefix, Fields.BATCH);
  const groupFieldId = combineIds(props.idPrefix, Fields.GROUP);
  const placeFieldId = combineIds(props.idPrefix, Fields.ID);

  return (
    <Paper>
      <Typography className={infoCss.title} component="h2" variant="h6">
        {tBinding.sectionTitle}
      </Typography>

      <FormGroup className={infoCss.fields}>
        <FormControl className={infoCss.field} disabled>
          <InputLabel htmlFor={batchFieldId}>
            {tBinding.batch}
          </InputLabel>
          <Select inputProps={{ id: batchFieldId }} />
        </FormControl>

        <FormControl className={infoCss.field} disabled>
          <InputLabel htmlFor={groupFieldId}>
            {tBinding.group}
          </InputLabel>
          <Select inputProps={{ id: groupFieldId }} />
        </FormControl>

        <FormControl className={infoCss.field} disabled>
          <InputLabel htmlFor={placeFieldId}>
            {tBinding.place}
          </InputLabel>
          <Select inputProps={{ id: placeFieldId }} />
        </FormControl>

        <div className={infoCss.actions}>
          <ThemeProvider theme={successTheme}>
            <Button
              className={infoCss.button}
              color={SUCCESS_PALETTE_NAME}
              variant="contained"
            >
              {tBinding.action}
            </Button>
          </ThemeProvider>
        </div>
      </FormGroup>
    </Paper>
  );
};

export default PlaceBinding;
