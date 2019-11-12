import { RouteConfig as OriginalRouteConfig } from 'react-router-config';

declare module 'react-router-config' {
  interface MatchedRoute<
    Params extends { [K in keyof Params]?: string },
    OriginalRouteConfig extends OriginalRouteConfig,
  > {
    route: RouteConfig;
    match: match<Params>;
  }

  function matchRoutes<
    Params extends { [K in keyof Params]?: string },
    RouteConfig extends OriginalRouteConfig,
  >(
    routes: RouteConfig[],
    pathname: string
  ): Array<MatchedRoute<RouteConfig, Params>>;
}
