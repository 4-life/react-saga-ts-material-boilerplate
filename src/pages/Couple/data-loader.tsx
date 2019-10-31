import React from 'react';
import { connect } from 'react-redux';

import { fetchDevices } from '../../actions/device-management/devices';
import { DoGetPlaces } from '../../actions/dummy-data';
import { Device, Place } from '../../models';

// components
import CouplePage, { Props as ComponentProps } from './component';

const mapDispatchToProps = {
  onInitDevice: (id: Device['device_id']) => fetchDevices([id]),
  onInitPlace: (id: Place['id']) => DoGetPlaces([id]),
};

export type Props = ComponentProps & {
  deviceId?: Device['device_id'],
  placeId?: Place['id'],
};

const CoupleDataLoader: React.FC<Props & typeof mapDispatchToProps> = (props) => {
  const { deviceId, placeId, onInitDevice, onInitPlace } = props;

  const [
    initedDeviceId,
    setDeviceInited,
  ] = React.useState<Device['device_id'] | null>(null);

  const [
    initedPlaceId,
    setPlaceInited,
  ] = React.useState<Place['id'] | null>(null);

  React.useEffect(
    () => {
      if (!deviceId) {
        return;
      }

      onInitDevice(deviceId);
      setDeviceInited(deviceId);
    },
    [deviceId, onInitDevice, setDeviceInited],
  );

  React.useEffect(
    () => {
      if (typeof placeId !== 'number') {
        return;
      }

      onInitPlace(placeId);
      setPlaceInited(placeId);
    },
    [placeId, onInitPlace, setPlaceInited],
  );

  return (
    <CouplePage
      {...props}
      deviceLoading={
        props.deviceLoading ||
        (!!props.deviceId && initedDeviceId !== props.deviceId)
      }
      placeLoading={
        props.placeLoading ||
        (typeof props.placeId === 'number' && initedPlaceId !== props.placeId)
      }
    />
  );
};

export default connect<
  {},
  typeof mapDispatchToProps,
  Props
>(null, mapDispatchToProps)(CoupleDataLoader);
