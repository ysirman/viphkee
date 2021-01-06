import { combineReducers } from "redux";
import { PlayerConfigType, PlayListType } from "../Types";

import playerConfig from "./playerConfig";
import playList from "./playList";

export default combineReducers<{
  playerConfig: PlayerConfigType;
  playList: PlayListType | PlayListType[] | undefined;
}>({
  playerConfig,
  playList,
});
