import React from 'react';

// components
import Skeleton, { SkeletonProps } from '@material-ui/lab/Skeleton';

type Props = SkeletonProps;

const FieldSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <Skeleton
      height={60}
      {...props}
    />
  );
};

export default FieldSkeleton;
