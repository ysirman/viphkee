import React, { useContext } from "react";

import { PlayListType } from "../Types";

import { resetPlayerConfig, updatePlayerConfig } from "../actions/playerConfig";
import { selectPlayList, deletePlayList } from "../actions/playList";
import PlayerContext from "../contexts/PlayerContext";

import { youtubeUrl, youtubeImgUrl } from "../utils/youtubeUrls";

import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";

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

  const handleDeleteButton = (e: any) => {
    e.stopPropagation();
    if (playListItem.isSelected === true) {
      dispatch(resetPlayerConfig());
    }
    dispatch(deletePlayList(playListItem));
  };

  return (
    <ListItem className="playListItem" button onClick={handleClickListItem}>
      <span
        className={
          playListItem.isSelected === true
            ? "currentPlay-icon"
            : "playListItem-index"
        }
      >
        {playListItem.isSelected === true ? <PlayArrowIcon /> : index + 1}
      </span>
      <img src={youtubeImgUrl(playListItem.videoId)} />
      <span className="videoTitle">{playListItem.videoTitle}</span>
      <IconButton
        className="delete-icon"
        aria-label="delete"
        onClick={(e) => handleDeleteButton(e)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
export default PlayListItem;
