import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
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
    toolbar: {
      ...theme.mixins.toolbar,
      width: '130px',
      display: 'block',
      margin: '20px auto 0px'
    },
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
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    },
    activeLink: {
      color: theme.palette.primary.main,
    },
    noPadding: {
      padding: 0,
    },
    logo: {
      width: '130px',
    },
    nested: {
      paddingLeft: theme.spacing(9),
    },
  }),
);

export default useStyles;
