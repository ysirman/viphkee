import React, { useContext, useEffect, useState } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { updatePlayerConfig } from "../../actions/playerConfig";

import Slider from "@material-ui/core/Slider";

const PlaybackRate: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlaybackRate = (_: any, rate: number | number[]) => {
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        playbackRate: rate as number,
      })
    );
  };

  useEffect(() => {
    setPlaybackRate(playerConfig.playbackRate);
  }, [playerConfig.playbackRate]);

  return (
    <>
      <Slider
        min={0.01}
        max={2}
        step={0.01}
        marks={[
          { value: 0.5, label: 0.5 },
          { value: 0.75, label: 0.75 },
          { value: 1, label: "標準" },
          { value: 1.25, label: 1.25 },
          { value: 1.5, label: 1.5 },
          { value: 2, label: 2 },
        ]}
        valueLabelDisplay={"auto"}
        color={"secondary"}
        value={playbackRate}
        onChange={(_, v) => setPlaybackRate(v as number)}
        onChangeCommitted={handlePlaybackRate}
      />
    </>
  );
};
export default PlaybackRate;
