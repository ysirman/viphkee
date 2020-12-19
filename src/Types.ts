export type PlayerState = {
  url: string;
  playing: boolean;
  seeking: boolean;
  volume: number;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
};

export type LoopState = {
  isLoop: boolean;
  start: string;
  end: string;
};

export type ZoomState = {
  isLoop: boolean;
  min: number;
  max: number;
};

export type Progress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};
