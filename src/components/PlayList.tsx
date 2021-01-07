import React, { useContext } from "react";
import PlayerContext from "../contexts/PlayerContext";
import { PlayListType } from "../Types";

import PlayListItem from "./PlayListItem";

import List from "@material-ui/core/List";

const PlayList: React.FC = () => {
  const { state } = useContext(PlayerContext);
  const playList = state.playList as PlayListType[];
  return (
    <List>
      {playList.map((playListItem, index) => (
        <PlayListItem key={index} playListItem={playListItem} />
      ))}
    </List>
  );
};
export default PlayList;
