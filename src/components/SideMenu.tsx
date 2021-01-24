import React, { useContext } from "react";

import PlayerContext from "../contexts/PlayerContext";

import { resetPlayerConfig } from "../actions/playerConfig";
import { deleteAllPlayList } from "../actions/playList";

import PlayList from "./PlayList";

import { APP_KEY } from "../utils/constants";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
  })
);

const SideMenu: React.FC<{
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menuOpen, setMenuOpen }) => {
  const classes = useStyles();
  const { dispatch } = useContext(PlayerContext);

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const handleDeleteAllPlayList = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently remove all playlist?"
      )
    ) {
      dispatch(resetPlayerConfig());
      dispatch(deleteAllPlayList());
      localStorage.removeItem(APP_KEY);
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={menuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={handleDeleteAllPlayList}>
          <ListItemIcon>
            <DeleteSweepIcon />
          </ListItemIcon>
          <ListItemText primary={"Clear Playlist"} />
        </ListItem>
      </List>
      <Divider />
      <PlayList />
    </Drawer>
  );
};

export default SideMenu;
