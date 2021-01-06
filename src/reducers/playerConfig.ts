import { PLAYER_CONFIG_CHANGE } from "../actions/playerConfig";
import { PlayerConfigType, PlayerConfigAction } from "../Types";

const initialState: PlayerConfigType = {
  url: "https://www.youtube.com/watch?v=I2_kfNM8iVo",
  playing: true,
  played: 0,
  loaded: 0,
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
) => {
  switch (action.type) {
    case PLAYER_CONFIG_CHANGE:
      return action.state;
    default:
      return state;
  }
};

export default playerConfig;
