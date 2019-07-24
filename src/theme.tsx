import { createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { Palette, PaletteOptions } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    drawerWidth: number;
    palette: Palette;
    status: {
      danger: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    drawerWidth?: number;
    palette?: PaletteOptions;
    status?: {
      danger?: string;
    };
  }
}

const outerTheme = createMuiTheme({
  drawerWidth: 240,
  palette: {
    primary: {
      main: '#ccc',
    },
  },
  status: {
    danger: orange[500],
  },
});

export default outerTheme;
