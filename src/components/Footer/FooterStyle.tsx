import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginTop: 'auto',
      flex: '1 100%',
      marginLeft: theme.drawerWidth,
    },
  }),
);

export default useStyles;
