import React from 'react';
import { matchRoutes } from 'react-router-config';

import Routes from '../../Routes';
import { Route } from '../../routing/typings';

// components
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import Link from '../../components/Link';

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
        let crumbNode;

        type CommonProps = {
          children: React.ReactNode;
          color: 'textSecondary';
          key: number;
          variant: 'h6';
        };

        const commonProps: CommonProps = {
          children: crumbContent,
          color: 'textSecondary',
          key: i,
          variant: 'h6',
        };

        const showAsLink = (
          !matchedRoute.match.isExact &&
          // TODO: support route-specific dynamic determination
          // of this depending on match or any other parameters?
          !matchedRoute.route.nonLinkBreadcrumb
        );

        if (showAsLink) {
          crumbNode = (
            <MuiLink
              {...commonProps}
              component={Link}
              to={matchedRoute.match.url}
            />
          );
        } else {
          crumbNode = <Typography {...commonProps} />;
        }

        breadcrumbs.push(crumbNode);
      }

      return breadcrumbs;
    },
    [] as React.ReactNode[],
  );
}
