import { combineReducers } from "redux";
import { PlayerState, PlayList } from "../Types";

import playerConfig from "./playerConfig";
import playList from "./playList";

export default combineReducers<{
  playerConfig: PlayerState;
  playList: PlayList | PlayList[] | undefined;
}>({
  playerConfig,
  playList,
});
