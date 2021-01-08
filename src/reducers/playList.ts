import {
  PLAY_LIST_ADD,
  PLAY_LIST_UPDATE,
  PLAY_LIST_SELECT,
  PLAY_LIST_DELETE,
} from "../actions/playList";
import { PlayListType, PlayListAction } from "../Types";

const validateDuplication = (state: PlayListType, action: PlayListType) => {
  if (
    state.videoId === action.videoId &&
    state.loopStart === action.loopStart &&
    state.loopEnd === action.loopEnd
  ) {
    return true;
  }
  return false;
};

const maxId = (state: PlayListType[]) => {
  return Math.max.apply(
    null,
    state.map((playListItem) => {
      return playListItem.id;
    })
  );
};

const playList = (state: PlayListType[] = [], action: PlayListAction) => {
  switch (action.type) {
    case PLAY_LIST_ADD: {
      const id = maxId(state) + 1;
      const filterdState = state.filter((playListItem) =>
        validateDuplication(playListItem, action.state)
      );
      if (filterdState.length === 0) {
        if (state.length !== 0) {
          state.filter(
            (playListItem) => playListItem.isSelected === true
          )[0].isSelected = false;
        }
        return [...state, { ...action.state, id }];
      }
      return state;
    }

    case PLAY_LIST_UPDATE: {
      const filterdState = state.filter(
        (playListItem) => playListItem.isSelected === false
      );
      const id = state.filter(
        (playListItem) => playListItem.isSelected === true
      )[0].id;
      return [...filterdState, { ...action.state, id }].sort((a, b) => {
        return a.id - b.id;
      });
    }

    case PLAY_LIST_SELECT: {
      const current = state.filter(
        (playListItem) => playListItem.isSelected === true
      );
      if (current.length !== 0) {
        state.filter(
          (playListItem) => playListItem.isSelected === true
        )[0].isSelected = false;
      }
      state.filter(
        (playListItem) => playListItem.id === action.state.id
      )[0].isSelected = true;
      return state.sort((a, b) => {
        return a.id - b.id;
      });
    }

    case PLAY_LIST_DELETE:
      return state.filter((playListItem) => playListItem.isSelected === false);

    default:
      return state;
  }
};

export default playList;
