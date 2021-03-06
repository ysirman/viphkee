import React from "react";

import SearchForm from "../molecules/SearchForm";
import VideoList from "../templates/VideoList";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 300;
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

const SideSearchMenu: React.FC<{
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menuOpen, setMenuOpen }) => {
  const classes = useStyles();

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  return (
    <Drawer
      id={"rightMenu"}
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={menuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <SearchForm />
      <VideoList />
    </Drawer>
  );
};

export default SideSearchMenu;
