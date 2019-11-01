import React from 'react';
import { RouteConfig } from 'react-router-config';

// components
import { Switch, SwitchProps, Route } from 'react-router-dom';

type RouteComponentGetter = (route: RouteConfig) => RouteConfig['component'];

type Options = {
  extraProps?: any,
  getRouteComponent?: RouteComponentGetter,
  routes: RouteConfig[] | undefined,
  switchProps?: SwitchProps,
};

const getRouteComponentDefault: RouteComponentGetter = (route) => {
  return route.component;
}

/**
 * It's similar to `react-router-config`'s `renderRoutes()` with a few differences:
 * - if `route.render` and route component are falsy, it renders the routes **recursively**
 * - it receives an options object instead of unnamed arguments list
 * - it supports an optional `options.getRouteComponent` to configure the route component property
 * (defaults to `route.component`)
 */
export function renderRoutes(options: Options) {
  if (!options.routes) {
    return null;
  }

  return (
    <Switch {...options.switchProps}>
      {options.routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            if (route.render) {
              return route.render({
                ...props,
                ...options.extraProps,
                route: route,
              });
            }

            const getRouteComponent = (
              options.getRouteComponent ||
              getRouteComponentDefault
            );

            const Component = getRouteComponent(route);

            if (Component) {
              return (
                <Component
                  {...props}
                  {...options.extraProps}
                  route={route}
                />
              );
            }

            return renderRoutes({
              ...options,
              routes: route.routes,
            });
          }}
        />
      ))}
    </Switch>
  );
}

export default renderRoutes;
