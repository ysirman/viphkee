import React, { useContext } from "react";

import PlayerContext from "../contexts/PlayerContext";

import { resetPlayerConfig } from "../actions/playerConfig";
import {
  addPlayList,
  updatePlayList,
  deletePlayList,
} from "../actions/playList";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListForm: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);

  const playerConfig = state.playerConfig;

  const handleAddButton = () => {
    dispatch(addPlayList(playerConfig));
  };

  const handleUpdateButton = () => {
    dispatch(updatePlayList(playerConfig));
  };

  const handleDeleteButton = () => {
    dispatch(resetPlayerConfig());
    dispatch(deletePlayList());
  };

  const isDisabled = playerConfig.url === "";

  return (
    <Box display="flex" justifyContent="center" mb={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddButton}
        disabled={isDisabled}
      >
        <PlaylistAddIcon />
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={handleUpdateButton}
        disabled={isDisabled}
      >
        <CachedIcon />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteButton}
        disabled={isDisabled}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default PlayListForm;
