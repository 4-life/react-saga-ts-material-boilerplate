import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  Device as DeviceModel,
  Place as PlaceModel,
  isPlaceId,
} from '../../../models';
import { RootState as State } from '../../../reducers';
import { CoupleRouteParams } from '../../../routing/routes/device-management';
import {
  areDevicesLoading,
  getDevice,
  getPlaceIdByDeviceId,
} from '../../../selectors/device-management/devices';
import {
  arePlacesLoading,
  getPlace,
  getDeviceIdByPlaceId,
} from '../../../selectors/device-management/places';

// components
import CouplePage, { Props as ComponentProps } from './data-loader';

type Props = ComponentProps & RouteComponentProps<CoupleRouteParams>;

interface Couple {
  device?: DeviceModel,
  place?: PlaceModel,
}

interface CoupleParams {
  deviceId?: DeviceModel['device_id'] | null,
  placeId?: PlaceModel['id'] | null,
}

function mapRouteParamToPlaceId(placeIdParam?: string) {
  if (!placeIdParam) {
    return undefined;
  }

  return parseInt(placeIdParam, 10);
}

function getCoupleParams(routeParams: CoupleRouteParams, state: State): CoupleParams {
  const { deviceId } = routeParams;
  const placeId = mapRouteParamToPlaceId(routeParams.placeId);

  if (deviceId && isPlaceId(placeId)) {
    return { deviceId, placeId };
  }

  if (!deviceId && !isPlaceId(placeId)) {
    return {
      deviceId: undefined,
      placeId: undefined,
    };
  }

  if (deviceId) {
    return {
      deviceId,
      placeId: getPlaceIdByDeviceId(deviceId, state),
    };
  }

  return {
    deviceId: getDeviceIdByPlaceId(placeId as PlaceModel['id'], state),
    placeId,
  };
}

function getCouple(coupleParams: CoupleParams, state): Couple {
  const { deviceId, placeId } = coupleParams;

  return {
    device: (
      deviceId
        ? (getDevice(deviceId, state) || undefined)
        : undefined
    ),
    place: (
      isPlaceId(placeId)
        ? (getPlace(placeId as PlaceModel['id'], state) || undefined)
        : undefined
    ),
  };
}

interface StateProps {
  device?: DeviceModel,
  deviceId?: DeviceModel['device_id'],
  deviceLoading: boolean,
  place?: PlaceModel,
  placeId?: PlaceModel['id'],
  placeLoading: boolean,
}

type OwnProps = Omit<Props, keyof StateProps>;

function mapStateToProps(state: State, props: OwnProps): StateProps {
  const coupleParams = getCoupleParams(props.match.params, state);
  const couple = getCouple(coupleParams, state);

  return {
    device: couple.device,
    place: couple.place,

    deviceId: (
      coupleParams.deviceId ||
      undefined
    ),
    placeId: (
      isPlaceId(coupleParams.placeId)
        ? coupleParams.placeId as PlaceModel['id']
        : undefined
    ),

    deviceLoading: (
      typeof coupleParams.deviceId === 'undefined' ||
      areDevicesLoading(state)
    ),
    placeLoading: (
      typeof coupleParams.placeId === 'undefined' ||
      arePlacesLoading(state)
    ),
  };
}

export default withRouter(
  connect<StateProps, {}, OwnProps, State>(mapStateToProps)(CouplePage),
);
