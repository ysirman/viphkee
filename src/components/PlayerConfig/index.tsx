import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import PlaybackRate from "./PlaybackRate";
import SeekSlider from "./SeekSlider";
import LoopRangeSlider from "./LoopRangeSlider";
import LoopConfig from "./LoopConfig";
import InputUrl from "./InputUrl";

import { secondsToTime } from "../../utils/formatter";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ScheduleIcon from "@material-ui/icons/Schedule";

const PlayerConfig: React.FC = () => {
  const { playerState } = useContext(PlayerContext);

  return (
    <Box m={4} mt={1}>
      <Box mb={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid
            container
            item
            xs={2}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <ScheduleIcon />
            </Grid>
            <Grid item xs>
              <Typography>
                {secondsToTime(playerState.duration * playerState.played)}
              </Typography>
            </Grid>
          </Grid>
          <PlaybackRate />
        </Grid>
      </Box>
      <SeekSlider />
      <LoopRangeSlider />
      <LoopConfig />
      <InputUrl />
    </Box>
  );
};
export default PlayerConfig;
