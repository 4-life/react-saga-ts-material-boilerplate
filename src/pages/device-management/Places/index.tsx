import React from 'react';
import { connect } from 'react-redux';

import { searchPlaces } from '../../../actions/dummy-data';
import { Place } from '../../../models';
import { useFetcher } from '../../../utils/data-fetching';
import { createAsyncDispatch } from '../../../utils/store';

// components
import Places from './component';

const array = [];

const mapDispatchToProps = (dispatch) => {
  const dispatchAsync = createAsyncDispatch(dispatch);

  return {
    onFetchPlaces: () => {
      return dispatchAsync<
        ReturnType<typeof searchPlaces>,
        Place[] | undefined
      >(searchPlaces())
        .then(res => res || array);
    },
  };
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const PlacesProvider: React.FC<DispatchProps> = (props) => {
  const { loading: placesLoading, value: places } = useFetcher({
    fetch: props.onFetchPlaces,
    initialValue: array,
  });

  return (
    <Places
      places={places}
      placesLoading={placesLoading}
    />
  );
};

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps,
)(PlacesProvider);
