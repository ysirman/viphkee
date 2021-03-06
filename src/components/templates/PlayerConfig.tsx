import React from "react";

import PlaybackRate from "../molecules/PlaybackRate";
import LoopRangeSlider from "../molecules/LoopRangeSlider";
import LoopConfig from "../organisms/LoopConfig";

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
