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
      padding: 0,
      flex: '3 0px',
      width: '100%',
    },
    testStyles: {
      margin: theme.spacing(5),
    },
    loader: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999999,
      width: '100%',
    },
    snakBarError: {
      backgroundColor: theme.palette.error.dark,
    },
    snakBarErrorСlose: {
      padding: theme.spacing(0.5),
    },
    snakBarErrorIcon: {
      fontSize: 20,
      marginRight: theme.spacing(1),
    },
    snakBarMessage: {
      display: 'flex',
      alignItems: 'center',
    },
    selectInput: {
      margin: 0,
      flex: 1,
    },
    selectIconButton: {
      padding: 0,
      pointerEvents: 'none',
      minWidth: '20px',
      marginLeft: theme.spacing(1),
      marginTop: 'calc(50% + 12px)',
    },
    dataTimeInput: {
      margin: 0,
      flex: 1,
    },
    dataTimeIconButton: {
      padding: 0,
      pointerEvents: 'none',
      minWidth: '20px',
      marginLeft: theme.spacing(1),
    },
    dropDownInput: {
      padding: '0 27px',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    inputFullWidth: {
      wordBreak: 'break-all',
      whiteSpace: 'nowrap'
    },
    buttonAddInSelect: {
      minWidth: '30px',
      padding: 0,
      marginLeft: theme.spacing(1),
      maxHeight: '30px'
    },
    expansionPanel: {
      marginTop: theme.spacing(0),
      marginBottom: 0,
      marginLeft: -theme.spacing(2),
      marginRight: -theme.spacing(2),
      '&.Mui-expanded': {
        marginLeft: -theme.spacing(2),
        marginRight: -theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: 0,
      }
    }
  }),
);

export default contentStyles;
