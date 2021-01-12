import React, { useContext, useEffect, useState } from "react";

import PlayerContext from "../contexts/PlayerContext";

import { resetPlayerConfig } from "../actions/playerConfig";
import {
  addPlayList,
  updatePlayList,
  deletePlayList,
} from "../actions/playList";
import { FlashMessageText, updateFlashMessage } from "../actions/flashMessage";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListForm: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const [videoTitle, setVideoTitle] = useState("");
  const [allowFlashMessage, setAllowFlashMessage] = useState(false);

  const playerConfig = state.playerConfig;
  const playList = state.playList;
  const currentPlayListItem = playList.filter(
    (playListItem) => playListItem.isSelected === true
  )[0];

  useEffect(() => {
    setAllowFlashMessage(true);
  }, []);

  useEffect(() => {
    if (allowFlashMessage) {
      dispatch(updateFlashMessage(FlashMessageText.update));
    }
  }, [playList]);

  useEffect(() => {
    setVideoTitle(currentPlayListItem?.videoTitle ?? "");
  }, [currentPlayListItem]);

  const handleAddButton = () => {
    dispatch(addPlayList(videoTitle, playerConfig));
  };

  const handleUpdateButton = () => {
    dispatch(updatePlayList(videoTitle, playerConfig));
  };

  const handleDeleteButton = () => {
    dispatch(resetPlayerConfig());
    dispatch(deletePlayList());
  };

  const isDisabled = playerConfig.url === "";

  return (
    <Box mx={4} mt={1}>
      <Grid container spacing={2} justify="flex-start" alignItems="center">
        <Grid item xs={9}>
          <TextField
            id="outlined-full-width"
            label="Title"
            style={{ margin: 8 }}
            placeholder="input phrase name"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={videoTitle}
            onChange={(e) => {
              setVideoTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            aria-label="add"
            onClick={handleAddButton}
            disabled={isDisabled}
          >
            <PlaylistAddIcon />
          </IconButton>
          <IconButton
            aria-label="update"
            onClick={handleUpdateButton}
            disabled={isDisabled}
          >
            <CachedIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDeleteButton}
            disabled={isDisabled}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayListForm;
