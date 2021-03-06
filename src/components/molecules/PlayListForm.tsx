import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import PlayerContext from "../../contexts/PlayerContext";

import { resetPlayerConfig } from "../../actions/playerConfig";
import {
  addPlayList,
  updatePlayList,
  deletePlayList,
} from "../../actions/playList";
import {
  FlashMessageText,
  updateFlashMessage,
} from "../../actions/flashMessage";

import { youtubeApiUrlVideo, youtubeId } from "../../utils/youtubeUrls";

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
      .get(youtubeApiUrlVideo(videoId))
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
        placeholder="input phrase name"
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
    <Grid container spacing={2} justify="flex-start" alignItems="center">
      <Grid item xs={12} sm={12} md={9}>
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
  );
};

export default PlayListForm;
