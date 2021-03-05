import React, { useReducer, useEffect } from "react";
import Ajv from "ajv";

import PlayerContext from "../contexts/PlayerContext";
import reducer from "../reducers";
import { State } from "../Types";
import { APP_KEY } from "../utils/constants";
import { StateSchema } from "../StateSchema";

const PlayerProvider = (props: { children: React.ReactNode }) => {
  const initialState = (): State => {
    const defaultState = {
      playList: [],
      playerConfig: {
        url: "",
        playing: true,
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
      },
      flashMessage: {
        isOpen: false,
        message: "",
      },
    };
    const appKeyLocalStorageData = localStorage.getItem(APP_KEY);
    if (!appKeyLocalStorageData) return defaultState;

    const appState = JSON.parse(appKeyLocalStorageData);
    const ajv = new Ajv();
    const validate = ajv.compile(StateSchema);
    if (validate(appState)) return appState as State;

    return defaultState;
  };

  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
