import React from 'react';

import { formatPlaceName, Place } from '../../../models';
import { placePath } from '../../../routing/routes/device-management';
import { useLocalization } from '../../../utils/localization';

// components
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

type Props = {
  places: Place[],
  placesLoading: boolean,
};

const Places: React.FC<Props> = (props) => {
  const t = useLocalization();
  
  if (props.placesLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );
  }
  
  if (!props.places.length) {
    return (
      <Typography variant="h3">
        {t.deviceManagement.places.notFound}
      </Typography>
    );
  }

  return (
    <List>
      {props.places.map((place) => (
        <ListItem key={place.id}>
          <Link href={placePath(place.id)}>
            {formatPlaceName(place)}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Places;
