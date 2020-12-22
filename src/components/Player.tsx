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
    // We only want to update time slider if we are not currently seeking
    if (!playerState.seeking) {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          played: progress.played,
          loaded: progress.loaded,
        },
      });
    }
    if (playerState.seekValue !== null && player instanceof ReactPlayer) {
      player.seekTo(playerState.seekValue);
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          seekValue: null,
        },
      });
    }
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
        url={playerState.url}
        volume={playerState.volume}
        playing={playerState.playing}
        playbackRate={playerState.playbackRate}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onError={(e) => console.log("onError", e)}
        onProgress={(state) => handleProgress(state)}
        onDuration={(state) => handleDuration(state)}
      />
      <PlayerConfig />
    </Box>
  );
};

export default Player;
