import React from 'react';
import { connect } from 'react-redux';

import { searchPlaces } from '../../../actions/dummy-data';
import { Place } from '../../../models';
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
      >(searchPlaces());
    },
  };
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const PlacesProvider: React.FC<DispatchProps> = (props) => {
  const { onFetchPlaces } = props;

  const [places, setPlaces] = React.useState<Place[]>(array);
  const [placesLoading, setPlacesLoading] = React.useState(false);
  const [fetcherCalled, setFetcherCalled] = React.useState(false);

  React.useEffect(
    () => {
      if (fetcherCalled || placesLoading) {
        return;
      }

      setFetcherCalled(true);
      setPlacesLoading(true);
      onFetchPlaces()
        .then((places) => setPlaces(places || array))
        .finally(() => setPlacesLoading(false));
    },
    [
      fetcherCalled, placesLoading, onFetchPlaces,
      setFetcherCalled, setPlaces, setPlacesLoading,
    ],
  );

  const placesLoadingOrAboutToStartLoading = (
    placesLoading ||
    !fetcherCalled
  );

  return (
    <Places
      places={places}
      placesLoading={placesLoadingOrAboutToStartLoading}
    />
  );
};

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps,
)(PlacesProvider);
