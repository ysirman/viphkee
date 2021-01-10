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

const state = (playerConfig: PlayerConfigType) => {
  return {
    id: DEFAULT_PLAY_LIST_ID,
    videoId: youtubeId(playerConfig.url),
    videoTitle: "dummy video title",
    loopStart: playerConfig.loopState.start,
    loopEnd: playerConfig.loopState.end,
    isSelected: true,
  };
};

export const addPlayList = (
  playerConfig: PlayerConfigType
): PlayListAction => ({
  type: PlayListActionType.added,
  state: state(playerConfig),
});

export const updatePlayList = (
  playerConfig: PlayerConfigType
): PlayListAction => ({
  type: PlayListActionType.updated,
  state: state(playerConfig),
});

export const deletePlayList = (): PlayListAction => ({
  type: PlayListActionType.deleted,
});

export const selectPlayList = (playListItem: PlayListType): PlayListAction => ({
  type: PlayListActionType.selected,
  state: {
    ...playListItem,
    isSelected: true,
  },
});
