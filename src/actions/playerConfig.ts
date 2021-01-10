import { PlayerConfigAction, PlayerConfigType } from "../Types";

const FEATURE = "playerConfig";
export const PlayerConfigActionType = {
  updated: `${FEATURE}/updated`,
  reset: `${FEATURE}/reset`,
} as const;

export const updatePlayerConfig = (
  playerConfig: PlayerConfigType
): PlayerConfigAction => ({
  type: PlayerConfigActionType.updated,
  payload: playerConfig,
});

export const resetPlayerConfig = (): PlayerConfigAction => ({
  type: PlayerConfigActionType.reset,
});
