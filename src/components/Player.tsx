import React, { useState, useContext } from "react";
import ReactPlayer from "react-player";

import PlayerContext from "../contexts/PlayerContext";
import { Progress } from "../Types";
import { PLAYER_CONFIG_CHANGE } from "../actions/playerConfig";
import PlayerConfig from "./PlayerConfig";

import { timeToSeconds } from "../utils/formatter";

import Box from "@material-ui/core/Box";

const Player: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);
  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const loopState = playerState.loopState;

  const handleProgress = (progress: Progress) => {
    // console.log('onProgress', state)
    const loopEndRate = timeToSeconds(loopState.end) / playerState.duration;
    if (
      loopState.isLoop === true &&
      progress.played > loopEndRate &&
      player instanceof ReactPlayer
    ) {
      console.log("LOOP!!");
      const loopStartRate =
        timeToSeconds(loopState.start) / playerState.duration;
      player.seekTo(loopStartRate);
    }
    dispatch({
      type: PLAYER_CONFIG_CHANGE,
      state: {
        ...playerState,
        played: progress.played,
        loaded: progress.loaded,
      },
    });
  };

  const handleDuration = (duration: number) => {
    console.log("onDuration", duration);
    dispatch({
      type: PLAYER_CONFIG_CHANGE,
      state: {
        ...playerState,
        duration: duration,
      },
    });
  };

  return (
    <Box className="App">
      <ReactPlayer
        ref={(ref) => setPlayer(ref)}
        className="react-player"
        width="100%"
        height={
          window.innerWidth > 1024
            ? "calc(100vh - 240px)"
            : "calc((9 / 16) * 100vw)"
        }
        controls={true}
        url={playerState.url}
        playing={playerState.playing}
        playbackRate={playerState.playbackRate}
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
