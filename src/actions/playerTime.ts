import { PlayerTimeAction, PlayerTimeType } from "../Types";

const FEATURE = "playerTime";
export const PlayerTimeActionType = {
  updated: `${FEATURE}/updated`,
} as const;

export const updatePlayerTime = (
  playerTime: PlayerTimeType
): PlayerTimeAction => ({
  type: PlayerTimeActionType.updated,
  payload: { played: playerTime.played },
});
