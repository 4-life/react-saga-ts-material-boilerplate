import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
      flexFlow: 'row wrap',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      backgroundColor: theme.palette.background.default,
      paddingTop: theme.spacing(3),
      flex: '3 0px',
    },
    testStyles: {
      margin: theme.spacing(5),
    },
  }),
);

export default contentStyles;
