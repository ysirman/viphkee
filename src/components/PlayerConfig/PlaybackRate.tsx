import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { updatePlayerConfig } from "../../actions/playerConfig";

import Slider from "@material-ui/core/Slider";

const PlaybackRate: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;

  const handlePlaybackRate = (_: any, rate: number | number[]) => {
    if (typeof rate === "number") {
      dispatch(
        updatePlayerConfig({
          ...playerConfig,
          playbackRate: rate,
        })
      );
    }
  };

  return (
    <>
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
        value={playerConfig.playbackRate}
        onChange={handlePlaybackRate}
      />
    </>
  );
};
export default PlaybackRate;
