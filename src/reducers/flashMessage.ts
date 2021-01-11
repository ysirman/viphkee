import { FlashMessageActionType } from "../actions/flashMessage";
import { FlashMessageType, FlashMessageAction } from "../Types";

const initialState: FlashMessageType = {
  isOpen: false,
  message: "",
};

const flashMessage = (
  state: FlashMessageType = initialState,
  action: FlashMessageAction
): FlashMessageType => {
  switch (action.type) {
    case FlashMessageActionType.updated:
      return action.payload ?? state;
    case FlashMessageActionType.reset:
      return initialState;
    default:
      return state;
  }
};

export default flashMessage;
