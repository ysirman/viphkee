import { PlayerConfigType, PlayListAction, PlayListType } from "../Types";
import { DEFAULT_PLAY_LIST_ID } from "../utils/constants";
import { youtubeId } from "../utils/youtubeUrls";

const FEATURE = "playList";
export const PlayListActionType = {
  added: `${FEATURE}/added`,
  updated: `${FEATURE}/updated`,
  deleted: `${FEATURE}/deleted`,
  selected: `${FEATURE}/selected`,
} as const;

const payload = (
  videoTitle: string,
  defaultTitle: string,
  playerConfig: PlayerConfigType
) => {
  return {
    id: DEFAULT_PLAY_LIST_ID,
    videoId: youtubeId(playerConfig.url),
    videoTitle: videoTitle,
    defaultTitle: defaultTitle,
    loopStart: playerConfig.loopState.start,
    loopEnd: playerConfig.loopState.end,
    isSelected: true,
  };
};

export const addPlayList = (
  videoTitle: string,
  defaultTitle: string,
  playerConfig: PlayerConfigType
): PlayListAction => ({
  type: PlayListActionType.added,
  payload: payload(videoTitle, defaultTitle, playerConfig),
});

export const updatePlayList = (
  videoTitle: string,
  defaultTitle: string,
  playerConfig: PlayerConfigType
): PlayListAction => ({
  type: PlayListActionType.updated,
  payload: payload(videoTitle, defaultTitle, playerConfig),
});

export const deletePlayList = (playListItem: PlayListType): PlayListAction => ({
  type: PlayListActionType.deleted,
  payload: playListItem,
});

export const selectPlayList = (playListItem: PlayListType): PlayListAction => ({
  type: PlayListActionType.selected,
  payload: {
    ...playListItem,
    isSelected: true,
  },
});
