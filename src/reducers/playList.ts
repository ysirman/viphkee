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
  if (state.length === 0) {
    return 0;
  }
  return Math.max.apply(
    null,
    state.map((playListItem) => {
      return playListItem.id;
    })
  );
};

const sortPlayList = (state: PlayListType[]) => {
  return state.sort((a, b) => {
    return a.id - b.id;
  });
};

const addPlayList = (state: PlayListType[], actionState: PlayListType) => {
  const id = maxId(state) + 1;
  const filterdState = state.filter((playListItem) =>
    validateDuplication(playListItem, actionState)
  );
  if (filterdState.length !== 0) {
    return state;
  }
  if (state.length !== 0) {
    state.filter(
      (playListItem) => playListItem.isSelected === true
    )[0].isSelected = false;
  }
  return [...state, { ...actionState, id }];
};

const updatePlayList = (state: PlayListType[], actionState: PlayListType) => {
  if (state.length === 0) {
    return addPlayList(state, actionState);
  }
  const filterdState = state.filter(
    (playListItem) => playListItem.isSelected === false
  );
  const id = state.filter((playListItem) => playListItem.isSelected === true)[0]
    .id;
  return sortPlayList([...filterdState, { ...actionState, id }]);
};

const selectPlayList = (state: PlayListType[], actionState: PlayListType) => {
  const currentItem = state.filter(
    (playListItem) => playListItem.isSelected === true
  );
  if (currentItem.length !== 0) {
    state.filter(
      (playListItem) => playListItem.isSelected === true
    )[0].isSelected = false;
  }
  state.filter(
    (playListItem) => playListItem.id === actionState.id
  )[0].isSelected = true;
  return sortPlayList(state);
};

const deletePlayList = (state: PlayListType[]) => {
  if (state.length === 0) {
    return state;
  }
  return state.filter((playListItem) => playListItem.isSelected === false);
};

const playList = (state: PlayListType[] = [], action: PlayListAction) => {
  switch (action.type) {
    case PLAY_LIST_ADD:
      return addPlayList(state, action.state);
    case PLAY_LIST_UPDATE:
      return updatePlayList(state, action.state);
    case PLAY_LIST_SELECT:
      return selectPlayList(state, action.state);
    case PLAY_LIST_DELETE:
      return deletePlayList(state);
    default:
      return state;
  }
};

export default playList;
