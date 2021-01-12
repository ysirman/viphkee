import React, { useContext } from "react";

import { PlayListType } from "../Types";

import { updatePlayerConfig } from "../actions/playerConfig";
import { selectPlayList } from "../actions/playList";
import PlayerContext from "../contexts/PlayerContext";

import { youtubeUrl, youtubeImgUrl } from "../utils/youtubeUrls";

import ListItem from "@material-ui/core/ListItem";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import "./PlayListItem.css";

const PlayListItem: React.FC<{ playListItem: PlayListType; index: number }> = ({
  playListItem,
  index,
}) => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;
  const handleClickListItem = () => {
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        url: youtubeUrl(playListItem.videoId),
        loopState: {
          isLoop: playListItem.loopStart !== playListItem.loopEnd,
          start: playListItem.loopStart,
          end: playListItem.loopEnd,
        },
      })
    );
    dispatch(selectPlayList(playListItem));
  };

  return (
    <ListItem className="playListItem" button onClick={handleClickListItem}>
      <span
        className={
          playListItem.isSelected === true
            ? "playListItem-icon"
            : "playListItem-index"
        }
      >
        {playListItem.isSelected === true ? <PlayArrowIcon /> : index + 1}
      </span>
      <img src={youtubeImgUrl(playListItem.videoId)} />
      <span>{playListItem.videoTitle}</span>
    </ListItem>
  );
};
export default PlayListItem;
