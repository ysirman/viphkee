import React, { useContext } from "react";

import PlayerContext from "../contexts/PlayerContext";

import { resetPlayerConfig } from "../actions/playerConfig";
import {
  PLAY_LIST_ADD,
  PLAY_LIST_UPDATE,
  PLAY_LIST_DELETE,
} from "../actions/playList";

import { youtubeId } from "../utils/youtubeUrls";
import { DEFAULT_PLAY_LIST_ID } from "../utils/constants";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListForm: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);

  const playerConfig = state.playerConfig;

  const handleAddButton = () => {
    dispatch({
      type: PLAY_LIST_ADD,
      state: {
        id: DEFAULT_PLAY_LIST_ID,
        videoId: youtubeId(playerConfig.url),
        videoTitle: "dummy video title",
        loopStart: playerConfig.loopState.start,
        loopEnd: playerConfig.loopState.end,
        isSelected: true,
      },
    });
  };

  const handleUpdateButton = () => {
    dispatch({
      type: PLAY_LIST_UPDATE,
      state: {
        id: DEFAULT_PLAY_LIST_ID,
        videoId: youtubeId(playerConfig.url),
        videoTitle: "dummy video title",
        loopStart: playerConfig.loopState.start,
        loopEnd: playerConfig.loopState.end,
        isSelected: true,
      },
    });
  };

  const handleDeleteButton = () => {
    dispatch(resetPlayerConfig());
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
