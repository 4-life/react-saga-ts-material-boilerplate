import { createMuiTheme } from '@material-ui/core/styles';

import { warning } from '../palettes';
import mainTheme from './main';

// TODO: merge "warning" color intention with the app-wide palette
// when it becomes supported to style the components this way.
// https://github.com/mui-org/material-ui/issues/13875

export const WARNING_PALETTE_NAME = 'primary';

export default createMuiTheme({
  ...mainTheme,
  palette: {
    ...mainTheme.palette,
    [WARNING_PALETTE_NAME]: warning,
  },
});
