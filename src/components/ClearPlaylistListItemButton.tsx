import React, { useContext } from "react";

import PlayerContext from "../contexts/PlayerContext";

import { resetPlayerConfig } from "../actions/playerConfig";
import { deleteAllPlayList } from "../actions/playList";

import { APP_KEY } from "../utils/constants";

import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

const ClearPlaylistListItemButton: React.FC = () => {
  const { dispatch } = useContext(PlayerContext);

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
    <List>
      <ListItem button onClick={handleDeleteAllPlayList}>
        <ListItemIcon>
          <DeleteSweepIcon />
        </ListItemIcon>
        <ListItemText primary={"Clear Playlist"} />
      </ListItem>
    </List>
  );
};

export default ClearPlaylistListItemButton;
