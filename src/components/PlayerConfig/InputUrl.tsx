import React, { useContext, useRef } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { PLAYER_CONFIG_CHANGE } from "../../actions/playerConfig";

import { validateUrl } from "../../utils/validator";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

const InputUrl: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);
  const inputUrlEl = useRef(document.createElement("input"));

  const handleUrlLoadButton = (url: string) => {
    if (validateUrl(url)) {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          url: url,
        },
      });
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sm={11} xs={10}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            Enter video URL
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            inputRef={inputUrlEl}
            labelWidth={120}
          />
        </FormControl>
      </Grid>
      <Grid item sm={1} xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUrlLoadButton(inputUrlEl.current.value)}
        >
          Load
        </Button>
      </Grid>
    </Grid>
  );
};
export default InputUrl;