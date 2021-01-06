import { PLAY_LIST_ADD } from "../actions/playList";
import { PlayList, PlayListAction } from "../Types";

const playList = (
  state: PlayList | PlayList[] | undefined = [],
  action: PlayListAction
) => {
  switch (action.type) {
    case PLAY_LIST_ADD:
      return action.state;
    default:
      return state;
  }
};

export default playList;
