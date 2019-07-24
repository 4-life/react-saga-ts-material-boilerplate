import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import Routes from '../../Routes';

// components
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Drawer,
  Divider,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  Home,
  LocalPizza,
  Report,
  AccountCircle,
  ExitToApp,
} from '@material-ui/icons';

// styles
import useStyles from './HeaderStyle';

// menu type
interface MenuLinks {
  label: string;
  to: string;
  activeOnlyWhenExact?: boolean;
  icon?: string;
}

const MenuIcon = ({icon}) => {
  switch (icon) {
    case 'home':
      return <Home />;
    case 'local_pizza':
      return <LocalPizza />;
    default:
      return <Report />;
  }
};

const MenuLink = ({ label, to, activeOnlyWhenExact, icon }: MenuLinks) => {
  const classes = useStyles();

  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <Link to={to} className={classes.noUnderline}>
          <ListItem button={true} className={clsx(match ? classes.activeLink : '', classes.links)}>
            <ListItemIcon>
              <MenuIcon icon={icon} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        </Link>
      )}
    />
  );
};

const Header: React.FC = () => {
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
    Auth.signOut();
  }

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} />
          {auth && (
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                    <AccountCircle />
                  </ListItemIcon>
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <Typography>Sign out</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
        <Typography variant="h3" align="center">Logo</Typography>
        </div>
        <Divider />
        <List className={classes.noPadding}>
          {Routes.map((route, index) => route.path && (
            <MenuLink
              key={index}
              label={route.label}
              to={route.path || ''}
              activeOnlyWhenExact={route.exact}
              icon={route.icon}
            />
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Header;
