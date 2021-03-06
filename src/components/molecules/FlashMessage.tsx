import React, { useContext } from "react";
import PlayerContext from "../../contexts/PlayerContext";

import { resetFlashMessage } from "../../actions/flashMessage";

import Snackbar from "@material-ui/core/Snackbar";

const FlashMessage: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const flashMessage = state.flashMessage;

  const handleSnackbarClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(resetFlashMessage());
  };
  return (
    <>
      <Snackbar
        open={flashMessage.isOpen}
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleSnackbarClose}
        message={flashMessage.message}
      />
    </>
  );
};
export default FlashMessage;
