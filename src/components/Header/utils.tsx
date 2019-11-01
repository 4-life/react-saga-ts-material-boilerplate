import React from 'react';
import { matchRoutes } from 'react-router-config';

import Routes from '../../Routes';
import { Route } from '../../routing/typings';

// components
import Typography from '@material-ui/core/Typography';

export function renderBreadcrumbsEntries({ pathname }) {
  const branch = matchRoutes(Routes, pathname);

  return branch.reduce(
    (breadcrumbs, matchedRoute, i) => {
      const route = matchedRoute.route as Route;

      const crumbContent = (
        route.label ||
        (
          route.renderBreadcrumb &&
          route.renderBreadcrumb(matchedRoute)
        )
      );

      if (crumbContent) {
        breadcrumbs.push(
          <Typography key={i} variant="h6" color="textSecondary">
            {crumbContent}
          </Typography>
        );
      }

      return breadcrumbs;
    },
    [] as React.ReactNode[],
  );
}
