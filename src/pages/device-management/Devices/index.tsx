import React from 'react';
import { connect } from 'react-redux';

import { searchDevices } from '../../../actions/device-management/devices';
import { Device } from '../../../models';
import { useFetcher } from '../../../utils/data-fetching';
import { createAsyncDispatch } from '../../../utils/store';

// components
import Devices from './component';

const array = [];

const mapDispatchToProps = (dispatch) => {
  const dispatchAsync = createAsyncDispatch(dispatch);

  return {
    onFetchDevices: () => {
      return dispatchAsync<
        ReturnType<typeof searchDevices>,
        Device[] | undefined
      >(searchDevices())
        .then(res => res || array);
    },
  };
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const DevicesProvider: React.FC<DispatchProps> = (props) => {
  const { loading: devicesLoading, value: devices } = useFetcher({
    fetch: props.onFetchDevices,
    initialValue: array,
  });

  return (
    <Devices
      devices={devices}
      devicesLoading={devicesLoading}
    />
  );
};

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps,
)(DevicesProvider);
