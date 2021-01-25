import React, { useContext, useRef, useState } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { updatePlayerConfig } from "../../actions/playerConfig";

import { validateUrl } from "../../utils/validator";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";

const InputUrl: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const [isError, setIsError] = useState(false);
  const playerConfig = state.playerConfig;
  const inputUrlEl = useRef(document.createElement("input"));

  const handleUrlLoadButton = (url: string) => {
    if (!validateUrl(url)) {
      setIsError(true);
      return;
    }
    setIsError(false);
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        url: url,
      })
    );
  };

  const errorMessage = () => {
    if (!isError) return;
    return (
      <FormHelperText id="component-error-text">
        Incorrect entry.
      </FormHelperText>
    );
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sm={11} xs={10}>
        <FormControl fullWidth variant="outlined" error>
          <OutlinedInput
            id="outlined-adornment-amount"
            inputRef={inputUrlEl}
            placeholder={"Enter Youtube URL"}
          />
          {errorMessage()}
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
