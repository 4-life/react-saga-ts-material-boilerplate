import { orange, red } from '@material-ui/core/colors';
import { PaletteColorOptions } from '@material-ui/core/styles/createPalette';

export const warning: PaletteColorOptions = {
  light: orange[200],
  main: orange[500],
  dark: orange[700],
  contrastText: '#fff',
};

export const danger: PaletteColorOptions = {
  light: red[200],
  main: red[500],
  dark: red[700],
  contrastText: '#fff',
};
