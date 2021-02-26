import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import PlayerContext from "../contexts/PlayerContext";
import { updatePlayerConfig } from "../actions/playerConfig";

import { youtubeUrl } from "../utils/youtubeUrls";
import { VideoListItemType } from "../Types";
import "./VideoListItem.css";

import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

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
    <>
      <ListItem className="videoListItem" alignItems="center">
        <img
          className="videoThumbnails"
          src={videoListItem.snippet.thumbnails.medium.url}
          onClick={handleClickListItem}
        />
        <span className="videoTitle">{videoListItem.snippet.title}</span>
      </ListItem>
      <Divider className="divider" />
    </>
  );
};
export default VideoListItem;
