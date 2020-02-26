import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Paper,
  Collapse,
  TextField,
  Typography,
  Toolbar,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  CssBaseline
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  menuIcon: {
    justifyContent: "center",
    minWidth: "22px",
    marginRight: "8px"
  },
  fullList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  contextIcons: {
    justifyContent: "center",
    padding: "12px",
    fontSize: "1.2rem"
  },
  searchForm: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  }
}));

export default function PageBase(props) {
  let { showAppBar, barTitle, onSearchSubmit, onAddForm } = props;
  const { children } = props;
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const history = useHistory();

  const toggleDrawer = event => {
    !toggle ? setToggle(true) : setToggle(false);
  };

  const toggleSearch = event => {
    !searchOpen ? setSearchOpen(true) : setSearchOpen(false);
  };

  const handleRedirect = (event, url) => {
    history.push(`${url}`);
  };

  return (
    <>
      <CssBaseline />
      {showAppBar && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {barTitle}
            </Typography>
            {barTitle === "Your Plants" && (
              <IconButton
                className={classes.contextIcons}
                onClick={toggleSearch}
                color="inherit"
              >
                <i className="fas fa-search"></i>
              </IconButton>
            )}
            {barTitle === "Your Plants" && (
              <IconButton
                className={classes.contextIcons}
                onClick={onAddForm}
                color="inherit"
              >
                <i className="fa fa-plus"></i>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      )}
      <Collapse in={searchOpen}>
        <Paper square={true}>
          <Toolbar className={classes.searchForm}>
            <form className={classes.searchForm}>
              <TextField size={"small"} id="searchInput" variant="outlined" />
              <Button variant={"contained"} onClick={onSearchSubmit}>
                Search
              </Button>
            </form>
          </Toolbar>
        </Paper>
      </Collapse>
      <Drawer
        anchor="left"
        open={toggle}
        onClose={toggleDrawer}
        className={classes.fullList}
        PaperProps={{ style: { justifyContent: "space-between" } }}
      >
        <List component="nav" aria-label="secondary nav">
          <ListItem button onClick={e => handleRedirect(e, "/dashboard")}>
            <ListItemIcon className={classes.menuIcon}>
              <i class="fas fa-home fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button onClick={e => handleRedirect(e, "/yourplants")}>
            <ListItemIcon className={classes.menuIcon}>
              <i className="fas fa-leaf fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Your Plants" />
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.menuIcon}>
              <i class="fas fa-book-open fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Plant Directory" />
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.menuIcon}>
              <i class="far fa-calendar-alt fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Events Calendar" />
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.menuIcon}>
              <i class="fas fa-bug fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Bug Watch" />
          </ListItem>
        </List>
        <List
          component="nav"
          aria-label="main nav"
          className={classes.secondNav}
        >
          <ListItem button>
            <ListItemIcon className={classes.menuIcon}>
              <i class="fas fa-user fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.menuIcon}>
              <i class="fas fa-sign-out-alt fa-lg"></i>
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      {children}
    </>
  );
}

PageBase.defaultProps = {
  showAppBar: true,
  barTitle: "Plantabase",
  onSearchSubmit: null
};
