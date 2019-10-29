import React from 'react';

import { Place as PlaceModel } from '../../../../models';
import { combineIds } from '../../../../utils/ids';
import { resolveArgs, useLocalization } from '../../../../utils/localization';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PlaceBinding from '../PlaceBinding';
import PlaceGeneralInfo from '../PlaceGeneralInfo';

// styles
import { useInfoBlockStyles } from '../InfoBlock/style';

interface Props {
  place?: PlaceModel,
  idPrefix?: string,
};

const Place: React.FC<Props> = (props) => {
  const infoCss = useInfoBlockStyles();
  const t = useLocalization();

  const { place } = props;

  if (!place) {
    return <PlaceBinding />;
  }

  return (
    <Paper>
      <Typography className={infoCss.title} component="h2" variant="h6">
        {resolveArgs(t.deviceManagement.place.sectionTitle, place)}
      </Typography>

      <PlaceGeneralInfo
        idPrefix={combineIds(props.idPrefix, 'general')}
        place={place}
      />
    </Paper>
  );
};

export default Place;
