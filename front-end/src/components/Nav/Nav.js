import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  title: {
    flexGrow: 1,
  },
  '@global': {
    a: {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  isActive: {
    backgroundColor: '#eee',
  },
  navItem: {
    backgroundColor: 'inherit',
  },
  navSection: {
    padding: 0,
  },
}));

/**
 * Nav A reusable nav bar with a sidebar
 *
 * @component
 */
function Nav({ children, title, links }) {
  const classes = useStyles();
  const isAuthenticated = useStoreState((state) => state.user.authenticated);
  const logout = useStoreActions((state) => state.user.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {links.map((section) => (
        <div
          key={section.reduce((key, { href, text }) => key + href + text, '')}
        >
          <Divider />
          <List className={classes.navSection}>
            {section.map(({ href, text }) => (
              <NavLink
                to={href}
                className={classes.link}
                key={href + text}
                activeClassName={classes.isActive}
              >
                <ListItem button key={text} className={classes.navItem}>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      ))}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap className={classes.title}>
            <Link to="/">{title}</Link>
          </Typography>

          {isAuthenticated ? (
            <Button data-test="logout" color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button data-test="login" color="inherit">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* Small page width drawer */}
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* Large page width drawer */}
        <Hidden smDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

Nav.defaultProps = {
  children: null,
  title: '',
};

Nav.propTypes = {
  /** The elements to render beside the sidebar. */
  children: PropTypes.element,
  /** The title to render on the app bar. */
  title: PropTypes.string,
  /** The links to render on the sidebar. */
  links: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
};

export default Nav;
