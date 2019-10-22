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
  palette: {
    primary: {
      main: '#dfbe2f',
    },
    secondary: {
      main: '#02aed6',
    },
  },
  status: {
    danger: orange[500],
  }
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getTableTheme = () => (createMuiTheme as any)({
  ...outerTheme,
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        padding: '10px',
        lineHeight: 1
      }
    }
  }
});

export default outerTheme;
