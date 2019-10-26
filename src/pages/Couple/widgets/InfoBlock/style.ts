import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useInfoBlockStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1),
    },
    field: {
      margin: theme.spacing(1),
    },
    field_type_switch: {
      justifyContent: 'space-between',
    },
    fields: {
      flexGrow: 1
    },
  }),
);
