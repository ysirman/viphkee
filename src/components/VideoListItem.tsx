import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import PlayerContext from "../contexts/PlayerContext";
import { updatePlayerConfig } from "../actions/playerConfig";

import { youtubeUrl } from "../utils/youtubeUrls";
import { VideoListItemType } from "../Types";
import "./VideoListItem.css";

import Grid from "@material-ui/core/Grid";

const VideoListItem: React.FC<{
  videoListItem: VideoListItemType;
}> = ({ videoListItem }) => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;
  const history = useHistory();

  const handleClickListItem = () => {
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        url: youtubeUrl(videoListItem.id.videoId),
      })
    );
    history.push("/");
  };

  return (
    <Grid item className="videoListItem">
      <img
        className="videoThumbnails"
        src={videoListItem.snippet.thumbnails.medium.url}
        onClick={handleClickListItem}
      />
      <span className="videoTitle">{videoListItem.snippet.title}</span>
    </Grid>
  );
};
export default VideoListItem;
