import React from "react";

import PlaybackRate from "./PlaybackRate";
import SeekSlider from "./SeekSlider";
import LoopRangeSlider from "./LoopRangeSlider";
import LoopConfig from "./LoopConfig";
import InputUrl from "./InputUrl";

import Box from "@material-ui/core/Box";

const PlayerConfig: React.FC = () => {
  return (
    <Box m={4} mt={1}>
      <PlaybackRate />
      <SeekSlider />
      <LoopRangeSlider />
      <LoopConfig />
      <InputUrl />
    </Box>
  );
};
export default PlayerConfig;
