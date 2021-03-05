import { PlayerConfigActionType } from "../actions/playerConfig";
import { PlayerConfigType, PlayerConfigAction } from "../Types";

const initialState: PlayerConfigType = {
  url: "",
  playing: true,
  duration: 0,
  playbackRate: 1.0,
  loopState: {
    isLoop: false,
    start: "0:00",
    end: "0:00",
  },
  zoomState: {
    isZoom: false,
    min: 0,
    max: 100,
  },
};

const playerConfig = (
  state: PlayerConfigType = initialState,
  action: PlayerConfigAction
): PlayerConfigType => {
  switch (action.type) {
    case PlayerConfigActionType.updated:
      return action.payload ?? state;
    case PlayerConfigActionType.reset:
      return initialState;
    default:
      return state;
  }
};

export default playerConfig;
