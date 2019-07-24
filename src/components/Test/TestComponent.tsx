import React from 'react';
import { connect } from 'react-redux';
import { DoIncrement, DoDecrement, DoIncrementAsync } from '../../reducers/counter';

// compomnents
import { Typography, Button } from '@material-ui/core';

// styles
import useStyles from './TestStyle';

interface Props {
  number: number;
  Increment: () => void;
  asyncInc: () => void;
  Decrement: () => void;
}

const mapStateToProps = (state: number) => ({
  number: state,
});

const mapDispatchToProps = (dispatch) => ({
  Increment: () => dispatch(DoIncrement()),
  Decrement: () => dispatch(DoDecrement()),
  asyncInc: () => dispatch(DoIncrementAsync()),
});

const Component = (props: Props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">{props.number}</Typography>
      <Button onClick={props.Increment} variant="contained" color="primary" className={classes.button}>Increment</Button>
      <Button onClick={props.asyncInc} variant="contained" color="primary" className={classes.button}>Async</Button>
      <Button onClick={props.Decrement} variant="contained" color="primary" className={classes.button}>Decrement</Button>
    </div>
  );
};

export const Test: React.FC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
