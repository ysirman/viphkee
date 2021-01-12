import React from "react";

import PlaybackRate from "./PlaybackRate";
import LoopRangeSlider from "./LoopRangeSlider";
import LoopConfig from "./LoopConfig";

import Box from "@material-ui/core/Box";

const PlayerConfig: React.FC = () => {
  return (
    <Box mx={4} mt={1}>
      <PlaybackRate />
      <LoopRangeSlider />
      <LoopConfig />
    </Box>
  );
};
export default PlayerConfig;
