import { combineReducers } from "redux";
import { PlayerConfigType, PlayListType, FlashMessageType } from "../Types";

import playerConfig from "./playerConfig";
import playList from "./playList";
import flashMessage from "./flashMessage";

export default combineReducers<{
  playerConfig: PlayerConfigType;
  playList: PlayListType[];
  flashMessage: FlashMessageType;
}>({
  playerConfig,
  playList,
  flashMessage,
});
