import React, { useState, useContext } from "react";
import ReactPlayer from "react-player";

import PlayerContext from "../contexts/PlayerContext";
import { ProgressType } from "../Types";
import { updatePlayerConfig } from "../actions/playerConfig";
import PlayerConfig from "./PlayerConfig";

import { timeToSeconds } from "../utils/formatter";

import Box from "@material-ui/core/Box";

const Player: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const playerConfig = state.playerConfig;
  const loopState = playerConfig.loopState;

  const handleProgress = (progress: ProgressType) => {
    // console.log('onProgress', state)
    const loopEndRate = timeToSeconds(loopState.end) / playerConfig.duration;
    if (
      loopState.isLoop === true &&
      progress.played > loopEndRate &&
      player instanceof ReactPlayer
    ) {
      console.log("LOOP!!");
      const loopStartRate =
        timeToSeconds(loopState.start) / playerConfig.duration;
      player.seekTo(loopStartRate);
    }
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        played: progress.played,
      })
    );
  };

  const handleDuration = (duration: number) => {
    console.log("onDuration", duration);
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        duration: duration,
      })
    );
    if (loopState.isLoop === true && player instanceof ReactPlayer) {
      const loopStartRate = timeToSeconds(loopState.start) / duration;
      player.seekTo(loopStartRate);
    }
  };

  return (
    <Box className="App">
      <ReactPlayer
        ref={(ref) => setPlayer(ref)}
        className="react-player"
        width="100%"
        height={
          window.innerWidth > 1024
            ? "calc(100vh - 440px)"
            : "calc((9 / 16) * 100vw)"
        }
        controls={true}
        url={playerConfig.url}
        playing={playerConfig.playing}
        playbackRate={playerConfig.playbackRate}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onBuffer={() => console.log("onBuffer")}
        onError={(e) => console.log("onError", e)}
        onProgress={(state) => handleProgress(state)}
        onDuration={(state) => handleDuration(state)}
      />
      <PlayerConfig />
    </Box>
  );
};

export default Player;
