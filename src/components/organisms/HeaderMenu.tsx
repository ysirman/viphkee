import React from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { grey } from "@material-ui/core/colors";

import "./HeaderMenu.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: grey[900],
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
  })
);

const HeaderMenu: React.FC<{
  leftMenuOpen: boolean;
  rightMenuOpen: boolean;
  setLeftMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRightMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ leftMenuOpen, rightMenuOpen, setLeftMenuOpen, setRightMenuOpen }) => {
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setLeftMenuOpen(true);
  };
  const handleSearchDrawerOpen = () => {
    setRightMenuOpen(true);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: leftMenuOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open left drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, leftMenuOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <h1 className="logo" style={{ flex: 1 }}>
          <Link to="/">Viphkee</Link>
        </h1>
        <IconButton
          color="inherit"
          aria-label="open right drawer"
          onClick={handleSearchDrawerOpen}
          edge="start"
          className={clsx(rightMenuOpen && classes.hide)}
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
