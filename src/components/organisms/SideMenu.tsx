import React from "react";
import { Link } from "react-router-dom";

import PlayList from "../templates/PlayList";
import ClearPlaylistListItemButton from "../molecules/ClearPlaylistListItemButton";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import PolicyIcon from "@material-ui/icons/Policy";

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

const ListItemLink = (props: ListItemProps<"a", { button?: true }>) => {
  return <ListItem button component="a" {...props} />;
};

const ListItemReactRouterLink = (
  props: ListItemProps<Link, { button?: true }>
) => {
  return <ListItem button component={Link} {...props} />;
};

const SideMenu: React.FC<{
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menuOpen, setMenuOpen }) => {
  const classes = useStyles();

  const handleDrawerClose = () => {
    setMenuOpen(false);
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
        <ListItemReactRouterLink to={"/privacy_policy"}>
          <ListItemIcon>
            <PolicyIcon />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItemReactRouterLink>
        <ListItemLink href="https://docs.google.com/forms/d/e/1FAIpQLSejBQTliE_MK60ewFiXRq4UR8tf6yG7NzaD1TUT-FkdkFhPsA/viewform?usp=sf_link">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemLink>
      </List>
      <Divider />
      <ClearPlaylistListItemButton />
      <Divider />
      <PlayList />
    </Drawer>
  );
};

export default SideMenu;
