import React from 'react';
import { Route, Link } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Routes from '../../Routes';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { State as userProfileState } from '../../reducers/user-profile';
import { RootState } from '../../reducers';

import logo from '../../images/nwave_logo_bk.png';

// components
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Divider,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  SwipeableDrawer,
  Breadcrumbs
} from '@material-ui/core';

import {
  Home,
  Report,
  AccountCircle,
  ExitToApp,
  Language,
  Message,
  Tune,
  ExpandLess,
  ExpandMore,
  SettingsApplications,
  Menu as MenuIcon,
  NavigateNext
} from '@material-ui/icons';

// styles
import useStyles from './HeaderStyle';

// menu type
interface MenuLinks {
  label: string;
  to: string;
  activeOnlyWhenExact?: boolean;
  icon?: string;
  subroutes?;
}

const MenuIcons = ({ icon, match }) => {
  const color = match ? 'primary' : undefined;

  switch (icon) {
    case 'global':
      return <Language color={color} />;
    case 'home':
      return <Home color={color} />;
    case 'settings':
      return <Tune color={color} />;
    case 'messages':
      return <Message color={color} />;
    default:
      return <Report color={color} />;
  }
};

const SubMenuLink = ({ label, to, activeOnlyWhenExact, icon, subroutes }: MenuLinks) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick(event) {
    event.stopPropagation();
    setOpen(!open);
  }

  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ location }) => (
        <div>
          <ListItem button={true} onClick={handleClick} className={clsx(location.pathname.includes(to) ? classes.activeLink : '', classes.links)}>
            <ListItemIcon>
              <MenuIcons icon={icon} match={location.pathname.includes(to)} />
            </ListItemIcon>
            <ListItemText primary={label} />
            {open || location.pathname.includes(to) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open || location.pathname.includes(to)} timeout="auto">
            <List component="div">
              {subroutes.map((route, index) => {
                const match = location.pathname === route.path;

                return (
                  <Link to={route.path} key={index} className={classes.noUnderline}>
                    <ListItem button={true} className={clsx(match ? classes.activeLink : '', classes.links, classes.nested)}>
                      <ListItemText primary={route.label} />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Collapse>
        </div>
      )}
    />
  );
};

const MainMenuLink = ({ label, to, activeOnlyWhenExact, icon }: MenuLinks) => {
  const classes = useStyles();

  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <Link to={to} className={classes.noUnderline}>
          <ListItem button={true} className={clsx(match ? classes.activeLink : '', classes.links)}>
            <ListItemIcon>
              <MenuIcons icon={icon} match={match} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        </Link>
      )}
    />
  );
};

interface Props {
  user: userProfileState;
}

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

const Component = (props: RouteProps & Props) => {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function signOut() {
    setAnchorEl(null);
  }

  const [stateMenu, setStateMenu] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setStateMenu(open);
  };

  const pathname = props && props.location && props.location.pathname;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(!stateMenu)}>
            <MenuIcon />
          </IconButton>
          <Breadcrumbs className={classes.title} separator={<NavigateNext fontSize="small" />}>
            {pathname && matchRoutes(Routes, pathname)
              .filter(({ route }) => route.label)
              .map(({ route }, i) => (
                <Typography key={i} variant="h6" color="textSecondary">
                  {route.label}
                </Typography>
              ))
            }
          </Breadcrumbs>
          {auth && (
            <div>
              <IconButton onClick={handleMenu}>
                <AccountCircle color="action" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted={true}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AccountCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={props.user.data.email}
                    secondary={
                      <React.Fragment>
                        <Typography variant="caption">{props.user.data.role}</Typography>
                      </React.Fragment>
                    }
                  />
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <SettingsApplications color="primary" />
                  </ListItemIcon>
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <ListItemIcon>
                    <ExitToApp color="primary" />
                  </ListItemIcon>
                  <Typography>Sign out</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={stateMenu}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.toolbar}>
          <img src={logo} alt="Logo" className={classes.logo} />
          <Typography variant="caption">Dashboard</Typography>
        </div>
        <Divider />
        <List className={classes.noPadding} onClick={toggleDrawer(false)}>
          {Routes.map((route, index) => {
            if (route.path && route.path.length > 0) {
              if (route.routes && route.routes.length) {
                return (
                  <SubMenuLink
                    key={index}
                    label={route.label}
                    to={route.path}
                    activeOnlyWhenExact={route.exact}
                    icon={route.icon}
                    subroutes={route.routes}
                  />
                );
              } else {
                return (
                  <MainMenuLink
                    key={index}
                    label={route.label}
                    to={route.path || ''}
                    activeOnlyWhenExact={route.exact}
                    icon={route.icon}
                  />
                );
              }
            } else {
              return ([]);
            }
          })}
        </List>
        <Divider />
      </SwipeableDrawer>
    </>
  );
};

export default withRouter(connect(
  mapStateToProps
)(Component));
