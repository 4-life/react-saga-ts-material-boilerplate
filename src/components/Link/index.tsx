import React from 'react';

import { Link, LinkProps } from 'react-router-dom';

// Material UI's Link requires the component to support holding `ref`
// https://material-ui.com/api/link/#props
// https://material-ui.com/guides/composition/#caveat-with-refs
// https://material-ui.com/guides/composition/#link
// https://github.com/ReactTraining/react-router/issues/6056
const LinkWithRef = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export default LinkWithRef;
