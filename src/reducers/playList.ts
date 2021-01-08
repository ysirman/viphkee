import { PLAY_LIST_ADD } from "../actions/playList";
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

const playList = (state: PlayListType[] = [], action: PlayListAction) => {
  switch (action.type) {
    case PLAY_LIST_ADD: {
      const length = state.length;
      const id = length === 0 ? 1 : state[length - 1].id + 1;
      const filterdState = state.filter((playListItem) =>
        validateDuplication(playListItem, action.state)
      );
      if (filterdState.length === 0) {
        return [...state, { ...action.state, id: id }];
      }
      return state;
    }
    default:
      return state;
  }
};

export default playList;
