import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { PLAYER_CONFIG_CHANGE } from "../../actions/playerConfig";

import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

import VolumeUp from "@material-ui/icons/VolumeUp";

const Volume: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);

  const handleVolume = (_: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          volume: newValue,
        },
      });
    }
  };

  return (
    <Grid container item xs={2} alignItems="center">
      <Grid item>
        <VolumeUp />
      </Grid>
      <Grid item xs>
        <Slider
          min={0}
          max={1}
          step={0.01}
          marks={[
            { value: 0.3, label: 0.3 },
            { value: 0.7, label: 0.7 },
          ]}
          valueLabelDisplay={"auto"}
          value={playerState.volume}
          onChange={handleVolume}
          aria-labelledby="continuous-slider"
        />
      </Grid>
    </Grid>
  );
};
export default Volume;
