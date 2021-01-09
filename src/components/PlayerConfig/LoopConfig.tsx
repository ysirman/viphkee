import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { updatePlayerConfig } from "../../actions/playerConfig";

import { secondsToTime, timeToSeconds } from "../../utils/formatter";
import { validateHHMMSS } from "../../utils/validator";

import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import LoopIcon from "@material-ui/icons/Loop";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const LoopConfig: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;
  const loopState = playerConfig.loopState;
  const zoomState = playerConfig.zoomState;

  const handleLooping = () => {
    if (validateHHMMSS(loopState.start)) {
      return;
    }
    if (validateHHMMSS(loopState.end) || loopState.end === "0:00") {
      return;
    }
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        loopState: { ...loopState, isLoop: !loopState.isLoop },
      })
    );
  };

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

  const handleZooming = (_: any) => {
    if (zoomState.isZoom === false && loopState.end !== "0:00") {
      const min =
        (timeToSeconds(loopState.start) / playerConfig.duration) * 100 - 5;
      const max =
        (timeToSeconds(loopState.end) / playerConfig.duration) * 100 + 5;
      dispatch(
        updatePlayerConfig({
          ...playerConfig,
          zoomState: {
            isZoom: true,
            min: min < 0 ? 0 : min,
            max: max > 100 ? 100 : max,
          },
        })
      );
    } else {
      dispatch(
        updatePlayerConfig({
          ...playerConfig,
          zoomState: { ...zoomState, isZoom: false },
        })
      );
    }
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
    <Grid container spacing={1} justify="flex-start" alignItems="center">
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <LoopIcon color={loopState.isLoop ? "action" : "disabled"} />
          </Grid>
          <Grid item>
            <Switch checked={loopState.isLoop} onChange={handleLooping} />
          </Grid>
          <Grid item>
            <ZoomOutMapIcon color={zoomState.isZoom ? "action" : "disabled"} />
          </Grid>
          <Grid item>
            <Switch checked={zoomState.isZoom} onChange={handleZooming} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid container item xs alignItems="center">
            <Grid item>
              <TextField
                label="Loop Start"
                variant="outlined"
                size="small"
                value={loopState.start}
                onChange={(e) => handleLoopStart(e.target.value)}
              />
            </Grid>
            <Grid item>
              <div>
                <ArrowDropUpIcon onClick={() => handleLoopStartUpDown(1)} />
              </div>
              <div>
                <ArrowDropDownIcon onClick={() => handleLoopStartUpDown(-1)} />
              </div>
            </Grid>
          </Grid>
          <Grid container item xs alignItems="center">
            <Grid item>
              <TextField
                label="Loop End"
                variant="outlined"
                size="small"
                value={loopState.end}
                onChange={(e) => handleLoopEnd(e.target.value)}
              />
            </Grid>
            <Grid item>
              <div>
                <ArrowDropUpIcon onClick={() => handleLoopEndUpDown(1)} />
              </div>
              <div>
                <ArrowDropDownIcon onClick={() => handleLoopEndUpDown(-1)} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LoopConfig;
