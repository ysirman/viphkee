import { CombinedState } from "redux";
import { PLAYER_CONFIG_CHANGE } from "./actions/playerConfig";
import { PLAY_LIST_ADD } from "./actions/playList";

export type PlayList = {
  id: number;
  videoId: string;
  videoTitle: string;
};

export type PlayerState = {
  url: string;
  playing: boolean;
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

const addPlayList = (state: PlayList) =>
  ({
    type: PLAY_LIST_ADD,
    state,
  } as const);

export type PlayListAction = ReturnType<typeof addPlayList>;

export type Action = PlayerConfigAction | PlayListAction;

export type PlayerContextType = {
  state: CombinedState<{
    playerConfig: PlayerState;
    playList: PlayList | PlayList[] | undefined;
  }>;
  dispatch: (action: Action) => void;
};

export interface State {
  playList: PlayList[];
  playerConfig: PlayerState;
}
