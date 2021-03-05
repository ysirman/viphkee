import { PlayerTimeActionType } from "../actions/playerTime";
import { PlayerTimeType, PlayerTimeAction } from "../Types";

const initialState: PlayerTimeType = {
  played: 0,
};

const playerTime = (
  state: PlayerTimeType = initialState,
  action: PlayerTimeAction
): PlayerTimeType => {
  switch (action.type) {
    case PlayerTimeActionType.updated:
      return action.payload ?? state;
    default:
      return state;
  }
};

export default playerTime;
