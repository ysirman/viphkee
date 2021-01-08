import { CombinedState } from "redux";
import {
  PLAYER_CONFIG_CHANGE,
  PLAYER_CONFIG_RESET,
} from "./actions/playerConfig";
import {
  PLAY_LIST_ADD,
  PLAY_LIST_UPDATE,
  PLAY_LIST_SELECT,
  PLAY_LIST_DELETE,
} from "./actions/playList";

export type PlayListType = {
  id: number;
  videoId: string;
  videoTitle: string;
  loopStart: string;
  loopEnd: string;
  isSelected: boolean;
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

const resetPlayerConfig = (state: PlayerConfigType) =>
  ({
    type: PLAYER_CONFIG_RESET,
  } as const);

export type PlayerConfigAction =
  | ReturnType<typeof changePlayerConfig>
  | ReturnType<typeof resetPlayerConfig>;

const addPlayList = (state: PlayListType) =>
  ({
    type: PLAY_LIST_ADD,
    state,
  } as const);

const updatePlayList = (state: PlayListType) =>
  ({
    type: PLAY_LIST_UPDATE,
    state,
  } as const);

const selectPlayList = (state: PlayListType) =>
  ({
    type: PLAY_LIST_SELECT,
    state,
  } as const);

const deletePlayList = (state: PlayListType) =>
  ({
    type: PLAY_LIST_DELETE,
  } as const);

export type PlayListAction =
  | ReturnType<typeof addPlayList>
  | ReturnType<typeof updatePlayList>
  | ReturnType<typeof selectPlayList>
  | ReturnType<typeof deletePlayList>;

export type Action = PlayerConfigAction | PlayListAction;

export type PlayerContextType = {
  state: CombinedState<{
    playerConfig: PlayerConfigType;
    playList: PlayListType[];
  }>;
  dispatch: (action: Action) => void;
};

export interface State {
  playList: PlayListType[];
  playerConfig: PlayerConfigType;
}
