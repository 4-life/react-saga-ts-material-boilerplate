import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
      marginLeft: theme.drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: theme.drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: theme.drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    noUnderline: {
      textDecoration: 'none',
    },
    links: {
      'color': theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    },
    activeLink: {
      backgroundColor: theme.palette.action.selected,
    },
    noPadding: {
      padding: 0,
    },
  }),
);

export default useStyles;
