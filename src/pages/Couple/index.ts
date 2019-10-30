import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Device as DeviceModel, Place as PlaceModel } from '../../models';
import { RootState as State } from '../../reducers';
import {
  areDevicesLoading,
  getDevice,
} from '../../selectors/device-management/devices';
import {
  arePlacesLoading,
  getPlace,
} from '../../selectors/device-management/places';

// components
import CouplePage, { Props as ComponentProps } from './component';

interface RouteParams {
  deviceId?: string,
  placeId?: string,
}

type Props = ComponentProps & RouteComponentProps<RouteParams>;

interface Couple {
  device?: DeviceModel,
  place?: PlaceModel,
}

interface CoupleParams {
  deviceId?: DeviceModel['device_id'],
  placeId?: PlaceModel['id'],
}

function getCouple(coupleParams: CoupleParams, state): Couple {
  return {
    device: (
      typeof coupleParams.deviceId === 'undefined'
        ? undefined
        : getDevice(coupleParams.deviceId, state)
    ),
    place: (
      typeof coupleParams.placeId === 'undefined'
        ? undefined
        : getPlace(coupleParams.placeId, state)
    ),
  };
}

interface StateProps {
  device?: DeviceModel,
  deviceLoading: boolean,
  place?: PlaceModel,
  placeLoading: boolean,
}

type OwnProps = Omit<Props, keyof StateProps>;

function mapStateToProps(state: State, props: OwnProps): StateProps {
  const coupleParams = {
    deviceId: props.match.params.deviceId,
    placeId: props.match.params.placeId
      ? parseInt(props.match.params.placeId, 10)
      : undefined,
  };

  const couple = getCouple(coupleParams, state);

  return {
    device: couple.device,
    deviceLoading: areDevicesLoading(state),
    place: couple.place,
    placeLoading: arePlacesLoading(state),
  };
}

export default withRouter(
  connect<StateProps, {}, OwnProps, State>(mapStateToProps)(CouplePage),
);
