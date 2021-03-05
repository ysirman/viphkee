import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import PlayedTime from "./PlayedTime";
import LoopTimeAdjust from "./LoopTimeAdjust";
import { updatePlayerConfig } from "../../actions/playerConfig";

import { timeToSeconds } from "../../utils/formatter";
import { validateHHMMSS } from "../../utils/validator";

import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

import LoopIcon from "@material-ui/icons/Loop";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

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

  const handleZooming = () => {
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

  return (
    <Grid container spacing={2} justify="flex-start" alignItems="center">
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
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <AccessTimeIcon />
          </Grid>
          <Grid item>
            <PlayedTime duration={playerConfig.duration} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <LoopTimeAdjust />
      </Grid>
    </Grid>
  );
};
export default LoopConfig;
