import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { PLAYER_CONFIG_CHANGE } from "../../actions/playerConfig";

import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

import FastForwardIcon from "@material-ui/icons/FastForward";

const PlaybackRate: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);

  const handlePlaybackRate = (_: any, rate: number | number[]) => {
    if (typeof rate === "number") {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          playbackRate: rate,
        },
      });
    }
  };

  return (
    <Grid container item xs spacing={1} alignItems="center">
      <Grid item>
        <FastForwardIcon />
      </Grid>
      <Grid item xs>
        <Slider
          min={0.01}
          max={2}
          step={0.01}
          marks={[
            { value: 0.5, label: 0.5 },
            { value: 1, label: 1 },
            { value: 1.5, label: 1.5 },
            { value: 2, label: 2 },
          ]}
          valueLabelDisplay={"auto"}
          color={"secondary"}
          value={playerState.playbackRate}
          onChange={handlePlaybackRate}
        />
      </Grid>
    </Grid>
  );
};
export default PlaybackRate;