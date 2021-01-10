import { CombinedState } from "redux";
import { PlayerConfigActionType } from "./actions/playerConfig";
import { PlayListActionType } from "./actions/playList";

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

type ValueOf<T> = T[keyof T];
export type PlayerConfigAction = {
  type: ValueOf<typeof PlayerConfigActionType>;
  state?: PlayerConfigType;
};

export type PlayListAction = {
  type: ValueOf<typeof PlayListActionType>;
  state?: PlayListType;
};

export type Action = PlayerConfigAction | PlayListAction;

export type PlayerContextType = {
  state: CombinedState<{
    playerConfig: PlayerConfigType;
    playList: PlayListType[];
  }>;
  dispatch: (action: Action) => void;
};

export type State = {
  playList: PlayListType[];
  playerConfig: PlayerConfigType;
};
