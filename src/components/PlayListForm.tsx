import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import PlayerContext from "../contexts/PlayerContext";

import { resetPlayerConfig } from "../actions/playerConfig";
import {
  addPlayList,
  updatePlayList,
  deletePlayList,
} from "../actions/playList";
import { FlashMessageText, updateFlashMessage } from "../actions/flashMessage";

import { youtubeApiUrl, youtubeId } from "../utils/youtubeUrls";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListForm: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const [defaultTitle, setDefaultTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [allowFlashMessage, setAllowFlashMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playerConfig = state.playerConfig;
  const playList = state.playList;
  const currentPlayListItem = playList.filter(
    (playListItem) => playListItem.isSelected === true
  )[0];
  const isVideoLoaded = playerConfig.url !== "";

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
    setDefaultTitle(currentPlayListItem?.defaultTitle ?? "");
  }, [currentPlayListItem]);

  useEffect(() => {
    if (!playerConfig.url) return;
    const videoId = youtubeId(playerConfig.url);
    if (videoId === "") return;
    if (currentPlayListItem?.videoId === videoId) return;
    setIsLoading(true);
    axios
      .get(youtubeApiUrl(videoId))
      .then((response) => {
        const title = response.data.items.shift().snippet.title;
        setDefaultTitle(title);
        setVideoTitle(title);
      })
      .catch(() => {
        console.log("[ERROR] Failed to get youtube api data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [playerConfig.url]);

  const title = () => {
    return videoTitle === "" ? defaultTitle : videoTitle;
  };

  const handleAddButton = () => {
    dispatch(addPlayList(title(), defaultTitle, playerConfig));
  };

  const handleUpdateButton = () => {
    dispatch(updatePlayList(title(), defaultTitle, playerConfig));
  };

  const handleDeleteButton = () => {
    dispatch(resetPlayerConfig());
    dispatch(deletePlayList(currentPlayListItem));
  };

  const textFieldForm = () => {
    return (
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
        onChange={(e) => setVideoTitle(e.target.value)}
      />
    );
  };

  return (
    <Box mx={4} mt={1}>
      <Grid container spacing={2} justify="flex-start" alignItems="center">
        <Grid item xs={9}>
          {isLoading === true ? <CircularProgress /> : textFieldForm()}
        </Grid>
        <Grid item>
          <IconButton
            aria-label="add"
            onClick={handleAddButton}
            disabled={!isVideoLoaded}
          >
            <PlaylistAddIcon />
          </IconButton>
          <IconButton
            aria-label="update"
            onClick={handleUpdateButton}
            disabled={!isVideoLoaded}
          >
            <CachedIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDeleteButton}
            disabled={!isVideoLoaded}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayListForm;
