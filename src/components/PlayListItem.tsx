import React, { useContext } from "react";

import { PlayListType } from "../Types";

import { updatePlayerConfig } from "../actions/playerConfig";
import { selectPlayList } from "../actions/playList";
import PlayerContext from "../contexts/PlayerContext";

import { youtubeUrl, youtubeImgUrl } from "../utils/youtubeUrls";

import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const PlayListItem: React.FC<{ playListItem: PlayListType }> = ({
  playListItem,
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
    <ListItem button onClick={handleClickListItem}>
      <img src={youtubeImgUrl(playListItem.videoId)} width="64px" />
      <Typography noWrap={true} variant={"caption"}>
        {playListItem.videoTitle}
      </Typography>
    </ListItem>
  );
};
export default PlayListItem;
