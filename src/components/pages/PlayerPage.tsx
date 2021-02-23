import React from "react";

import Player from "../Player";
import PlayListForm from "../PlayListForm";
import InputUrl from "../PlayerConfig/InputUrl";

import Box from "@material-ui/core/Box";

const PlayerPage: React.FC = () => {
  return (
    <>
      <Player />
      <Box mx={4} mt={1}>
        <PlayListForm />
        <InputUrl />
      </Box>
    </>
  );
};

export default PlayerPage;
