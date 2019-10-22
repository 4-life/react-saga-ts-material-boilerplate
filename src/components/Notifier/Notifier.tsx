import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { RemoveSnackbar } from '../../actions/notifier';
import { State } from '../../reducers/notifier';

interface Props {
  notifications: State;
  closeSnackbar: (key: number) => void;
  RemoveSnackbar: (key: number) => void;
  enqueueSnackbar: (a, e) => void;
}

class Notifier extends Component<Props, {}> {
  private displayed: number[] = [];

  public storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  public shouldComponentUpdate(nextProps): boolean {
    const newSnacks = nextProps.notifications.notifications;
    if (!newSnacks.length) {
      this.displayed = [];
      return false;
    }

    const { notifications: currentSnacks } = this.props.notifications;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      const newSnack: { dismissed: boolean; key: number } = newSnacks[i];
      if (newSnack.dismissed) {
        this.props.closeSnackbar(newSnack.key);
        this.props.RemoveSnackbar(newSnack.key);
      }

      if (notExists) {
        continue;
      }
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length;
    }
    return notExists;
  }

  public componentDidUpdate() {
    const { notifications = [] } = this.props.notifications;

    notifications.forEach(({ key, message, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) {
        return;
      }
      // Display snackbar using notistack
      this.props.enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, key) => {
          if (options.onClose) {
            options.onClose(event, reason, key);
          }

          // Dispatch action to remove snackbar from redux store
          this.props.RemoveSnackbar(key);
        }
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  public render() {
    return null;
  }
}

const mapStateToProps = store => ({
  notifications: store.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ RemoveSnackbar }, dispatch);

export default withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier));
