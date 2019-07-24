import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    color: {
      color: theme.palette.primary.dark,
    },
  }),
);

export default useStyles;
