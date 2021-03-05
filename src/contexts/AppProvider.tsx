import React from "react";

import PlayerProvider from "../contexts/PlayerProvider";
import PlayerTimeProvider from "../contexts/PlayerTimeProvider";

const AppProvider = (props: { children: React.ReactNode }) => {
  return (
    <PlayerProvider>
      <PlayerTimeProvider>{props.children}</PlayerTimeProvider>
    </PlayerProvider>
  );
};

export default AppProvider;
