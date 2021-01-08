import React, { useContext } from "react";

import PlayerContext from "../contexts/PlayerContext";

import { PLAYER_CONFIG_RESET } from "../actions/playerConfig";
import {
  PLAY_LIST_ADD,
  PLAY_LIST_UPDATE,
  PLAY_LIST_DELETE,
} from "../actions/playList";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListForm: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);

  const playerConfig = state.playerConfig;
  const playList = state.playList;

  const handleAddButton = () => {
    const videoId = new URL(playerConfig.url).searchParams.get("v");
    if (videoId === "" || videoId === null) {
      return;
    }
    dispatch({
      type: PLAY_LIST_ADD,
      state: {
        id: 0,
        videoId: videoId,
        videoTitle: "dummy video title",
        loopStart: playerConfig.loopState.start,
        loopEnd: playerConfig.loopState.end,
        isSelected: true,
      },
    });
  };

  const handleUpdateButton = () => {
    const videoId = new URL(playerConfig.url).searchParams.get("v");
    if (videoId === "" || videoId === null) {
      return;
    }
    if (playList.length === 0) {
      handleAddButton();
    }
    dispatch({
      type: PLAY_LIST_UPDATE,
      state: {
        id: 0,
        videoId: videoId,
        videoTitle: "dummy video title",
        loopStart: playerConfig.loopState.start,
        loopEnd: playerConfig.loopState.end,
        isSelected: true,
      },
    });
  };

  const handleDeleteButton = () => {
    dispatch({
      type: PLAYER_CONFIG_RESET,
    });
    dispatch({
      type: PLAY_LIST_DELETE,
    });
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
