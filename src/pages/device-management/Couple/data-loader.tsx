import React from 'react';
import { connect } from 'react-redux';

import { fetchDevices } from '../../../actions/device-management/devices';
import { fetchPlaceDevice } from '../../../actions/device-management/place-device-couple';
import { DoGetPlaces } from '../../../actions/dummy-data';
import { Device, Place, isPlaceId } from '../../../models';

// components
import CouplePage, { Props as ComponentProps } from './component';

type PlaceInitHandlerOptions = {
  deviceId?: Device['device_id'];
  placeId: Place['id'];
};

const mapDispatchToProps = (dispatch) => ({
  onInitDevice: (id: Device['device_id']) => {
    return dispatch(fetchDevices([id]));
  },
  onInitPlace: (options: PlaceInitHandlerOptions) => {
    dispatch(DoGetPlaces([options.placeId]));

    if (!options.deviceId) {
      dispatch(fetchPlaceDevice(options.placeId));
    }
  },
});

export type Props = ComponentProps & {
  deviceId?: Device['device_id'];
  placeId?: Place['id'];
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const CoupleDataLoader: React.FC<Props & DispatchProps> = (props) => {
  const { deviceId, placeId, onInitDevice, onInitPlace } = props;

  const [
    initedDeviceId,
    setDeviceInited,
  ] = React.useState<Device['device_id'] | null>(null);

  const [
    initedPlaceId,
    setPlaceInited,
  ] = React.useState<Place['id'] | null>(null);

  const deviceIdInited = (
    !props.deviceId ||
    props.deviceId === initedDeviceId
  );

  const placeIdInited = (
    !isPlaceId(props.placeId) ||
    props.placeId === initedPlaceId
  );

  React.useEffect(
    () => {
      if (!deviceId || deviceIdInited) {
        return;
      }

      onInitDevice(deviceId);
      setDeviceInited(deviceId);
    },
    [deviceId, deviceIdInited, onInitDevice, setDeviceInited],
  );

  React.useEffect(
    () => {
      if (!isPlaceId(placeId) || placeIdInited) {
        return;
      }

      onInitPlace({ deviceId, placeId: placeId as Place['id'] });
      setPlaceInited(placeId as Place['id']);
    },
    [deviceId, placeId, placeIdInited, onInitPlace, setPlaceInited],
  );

  const deviceLoadingOrAboutToStartLoading = (
    props.deviceLoading ||
    !deviceIdInited
  );

  const placeLoadingOrAboutToStartLoading = (
    props.placeLoading ||
    !placeIdInited
  );

  return (
    <CouplePage
      {...props}
      deviceLoading={deviceLoadingOrAboutToStartLoading}
      placeLoading={placeLoadingOrAboutToStartLoading}
    />
  );
};

/* eslint-disable no-unexpected-multiline */
export default connect/* <
  {},
  typeof mapDispatchToProps,
  Props
>*/(null, mapDispatchToProps)(CoupleDataLoader);
/* eslint-enable no-unexpected-multiline */
