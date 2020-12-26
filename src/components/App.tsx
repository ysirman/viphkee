import React, { useReducer } from "react";

import PlayerContext from "../contexts/PlayerContext";
import reducer from "../reducers/playerConfig";
import { PlayerState } from "../Types";
import Player from "./Player";

import Box from "@material-ui/core/Box";

const App: React.FC = () => {
  const initialState: PlayerState = {
    url: "https://www.youtube.com/watch?v=I2_kfNM8iVo",
    playing: true,
    seeking: false,
    seekValue: null,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loopState: {
      isLoop: false,
      start: "0:00",
      end: "0:00",
    },
    zoomState: {
      isZoom: false,
      min: 0,
      max: 100,
    },
  };
  const [playerState, dispatch] = useReducer(reducer, initialState);

  return (
    <Box className="App">
      <PlayerContext.Provider value={{ playerState, dispatch }}>
        <Player />
      </PlayerContext.Provider>
    </Box>
  );
};

export default App;
