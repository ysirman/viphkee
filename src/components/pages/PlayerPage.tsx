import React from "react";

import Player from "../molecules/Player";
import PlayerConfig from "../templates/PlayerConfig";
import PlayListForm from "../molecules/PlayListForm";
import InputUrl from "../molecules/InputUrl";

import Box from "@material-ui/core/Box";

const PlayerPage: React.FC = () => {
  return (
    <>
      <Box className="App">
        <Player />
        <PlayerConfig />
      </Box>
      <Box mx={4} mt={1}>
        <PlayListForm />
        <InputUrl />
      </Box>
    </>
  );
};

export default PlayerPage;
