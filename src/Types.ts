import { CombinedState } from "redux";
import { PlayerConfigActionType } from "./actions/playerConfig";
import { PlayListActionType } from "./actions/playList";
import { FlashMessageActionType } from "./actions/flashMessage";

export type PlayListType = {
  id: number;
  videoId: string;
  videoTitle: string;
  defaultTitle: string;
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

export type FlashMessageType = {
  isOpen: boolean;
  message: string;
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
  payload?: PlayerConfigType;
};

export type PlayListAction = {
  type: ValueOf<typeof PlayListActionType>;
  payload?: PlayListType;
};

export type FlashMessageAction = {
  type: ValueOf<typeof FlashMessageActionType>;
  payload?: FlashMessageType;
};

export type Action = PlayerConfigAction | PlayListAction | FlashMessageAction;

export type PlayerContextType = {
  state: CombinedState<{
    playerConfig: PlayerConfigType;
    playList: PlayListType[];
    flashMessage: FlashMessageType;
  }>;
  dispatch: (action: Action) => void;
};

export type State = {
  playList: PlayListType[];
  playerConfig: PlayerConfigType;
  flashMessage: FlashMessageType;
};

// because don't know how to use @types/gapi or gapi-script in typescript
// define types myself only required this app.
export type YoutubeSearchResult = {
  nextPageToken: string;
  items: VideoListItemType[];
};

export type VideoListItemType = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: Thumbnails;
  };
};

export type Thumbnails = {
  default: { url: string };
  medium: { url: string };
  high: { url: string };
};
