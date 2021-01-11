import { FlashMessageAction } from "../Types";

const FEATURE = "flashMessage";
export const FlashMessageActionType = {
  updated: `${FEATURE}/updated`,
  reset: `${FEATURE}/reset`,
} as const;

export const FlashMessageText = {
  add: "playlist was successfully added.",
  update: "playlist was successfully updated.",
  delete: "playlist was successfully deleted.",
} as const;

export const updateFlashMessage = (message: string): FlashMessageAction => ({
  type: FlashMessageActionType.updated,
  payload: { isOpen: true, message: message },
});

export const resetFlashMessage = (): FlashMessageAction => ({
  type: FlashMessageActionType.reset,
});
