import { CombinedState } from "redux";
import { PLAYER_CONFIG_CHANGE } from "./actions/playerConfig";
import { PLAY_LIST_ADD } from "./actions/playList";

export type PlayListType = {
  id: number;
  videoId: string;
  videoTitle: string;
};

export type PlayerConfigType = {
  url: string;
  playing: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loopState: LoopStateType;
  zoomState: ZoomStateType;
};

export type LoopStateType = {
  isLoop: boolean;
  start: string;
  end: string;
};

export type ZoomStateType = {
  isZoom: boolean;
  min: number;
  max: number;
};

export type ProgressType = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const changePlayerConfig = (state: PlayerConfigType) =>
  ({
    type: PLAYER_CONFIG_CHANGE,
    state,
  } as const);

export type PlayerConfigAction = ReturnType<typeof changePlayerConfig>;

const addPlayList = (state: PlayListType) =>
  ({
    type: PLAY_LIST_ADD,
    state,
  } as const);

export type PlayListAction = ReturnType<typeof addPlayList>;

export type Action = PlayerConfigAction | PlayListAction;

export type PlayerContextType = {
  state: CombinedState<{
    playerConfig: PlayerConfigType;
    playList: PlayListType | PlayListType[] | undefined;
  }>;
  dispatch: (action: Action) => void;
};

export interface State {
  playList: PlayListType[];
  playerConfig: PlayerConfigType;
}
