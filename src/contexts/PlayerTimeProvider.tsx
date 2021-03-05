import React, { useReducer } from "react";

import PlayerTimeContext from "../contexts/PlayerTimeContext";
import reducer from "../reducers/playerTime";

const PlayerTimeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { played: 0 });

  return (
    <PlayerTimeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlayerTimeContext.Provider>
  );
};

export default PlayerTimeProvider;
