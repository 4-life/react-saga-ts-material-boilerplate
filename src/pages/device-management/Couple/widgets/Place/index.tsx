import React from 'react';

import { Place as PlaceModel } from '../../../../../models';
import { combineIds } from '../../../../../utils/ids';
import { resolveArgs, useLocalization } from '../../../../../utils/localization';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FieldSkeleton } from '../../../../../components/Skeleton';
import PlaceBinding from '../PlaceBinding';
import PlaceGeneralInfo from '../PlaceGeneralInfo';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  place?: PlaceModel;
  idPrefix?: string;
  loading: boolean;
}

const Place: React.FC<Props> = (props) => {
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();

  const { loading, place } = props;

  if (!place && !loading) {
    return <PlaceBinding />;
  }

  return (
    <Paper className={infoCss.root}>
      {place && !loading
        ? (
          <Typography className={infoCss.title} component="h2" variant="h6">
            {resolveArgs(t.deviceManagement.place.sectionTitle, place)}
          </Typography>
        )
        : <FieldSkeleton className={infoCss.field} />
      }

      <PlaceGeneralInfo
        idPrefix={combineIds(props.idPrefix, 'general')}
        place={place}
      />
    </Paper>
  );
};

export default Place;
