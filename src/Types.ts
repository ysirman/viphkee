import { PLAYER_CONFIG_CHANGE } from "./actions/playerConfig";

export type PlayerState = {
  url: string;
  playing: boolean;
  seeking: boolean;
  volume: number;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loopState: LoopState;
  zoomState: ZoomState;
};

export type LoopState = {
  isLoop: boolean;
  start: string;
  end: string;
};

export type ZoomState = {
  isZoom: boolean;
  min: number;
  max: number;
};

export type Progress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const changePlayerConfig = (state: PlayerState) =>
  ({
    type: PLAYER_CONFIG_CHANGE,
    state,
  } as const);

export type PlayerConfigAction = ReturnType<typeof changePlayerConfig>;

export type PlayerContextType = {
  playerState: PlayerState;
  dispatch: (action: PlayerConfigAction) => void;
};
