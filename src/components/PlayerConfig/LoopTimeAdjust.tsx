import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import LoopTimeUpDown from "./LoopTimeUpDown";
import { updatePlayerConfig } from "../../actions/playerConfig";

import { secondsToTime, timeToSeconds } from "../../utils/formatter";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const LoopTimeAdjust: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;
  const loopState = playerConfig.loopState;

  const handleLoopStart = (loopStart: string) => {
    if (loopStart === "") {
      loopStart = "0:00";
    }
    console.log("set loop start time:", loopStart);
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        loopState: { ...loopState, start: loopStart },
      })
    );
  };

  const handleLoopEnd = (loopEnd: string): void => {
    if (loopEnd === "") {
      loopEnd = "0:00";
    }
    console.log("set loop end time:", loopEnd);
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        loopState: { ...loopState, end: loopEnd },
      })
    );
  };

  const handleLoopStartUpDown = (plusOrMinus: number) => {
    const newStartValue = timeToSeconds(loopState.start) + 1 * plusOrMinus;
    if (newStartValue >= 0 && newStartValue < timeToSeconds(loopState.end)) {
      dispatch(
        updatePlayerConfig({
          ...playerConfig,
          loopState: { ...loopState, start: secondsToTime(newStartValue) },
        })
      );
    }
  };

  const handleLoopEndUpDown = (plusOrMinus: number) => {
    const newEndValue = timeToSeconds(loopState.end) + 1 * plusOrMinus;
    if (
      newEndValue <= playerConfig.duration &&
      newEndValue > timeToSeconds(loopState.start)
    ) {
      dispatch(
        updatePlayerConfig({
          ...playerConfig,
          loopState: { ...loopState, end: secondsToTime(newEndValue) },
        })
      );
    }
  };

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid container item xs alignItems="center">
          <Grid item>
            <TextField
              className="loopInput"
              label="Loop Start"
              variant="outlined"
              size="small"
              value={loopState.start}
              onChange={(e) => handleLoopStart(e.target.value)}
            />
          </Grid>
          <LoopTimeUpDown handleLoopTimeUpDown={handleLoopStartUpDown} />
        </Grid>
        <Grid container item xs alignItems="center">
          <Grid item>
            <TextField
              className="loopInput"
              label="Loop End"
              variant="outlined"
              size="small"
              value={loopState.end}
              onChange={(e) => handleLoopEnd(e.target.value)}
            />
          </Grid>
          <LoopTimeUpDown handleLoopTimeUpDown={handleLoopEndUpDown} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LoopTimeAdjust;
