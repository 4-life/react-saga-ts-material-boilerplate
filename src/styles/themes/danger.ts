import { createMuiTheme } from '@material-ui/core/styles';

import { danger } from '../palettes';
import mainTheme from './main';

// TODO: merge "danger" color intention with the app-wide palette
// when it becomes supported to style the components this way.
// https://github.com/mui-org/material-ui/issues/13875

export const DANGER_PALETTE_NAME = 'primary';

export default createMuiTheme({
  ...mainTheme,
  palette: {
    ...mainTheme.palette,
    [DANGER_PALETTE_NAME]: danger,
  },
});
