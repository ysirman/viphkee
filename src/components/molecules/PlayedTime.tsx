import React, { useContext } from "react";

import PlayerTimeContext from "../../contexts/PlayerTimeContext";

import { secondsToTime } from "../../utils/formatter";
import Typography from "@material-ui/core/Typography";

const PlayedTime: React.FC<{ duration: number }> = ({ duration }) => {
  const { state: playerTime } = useContext(PlayerTimeContext);
  const played = playerTime.played;

  return (
    <>
      <Typography>{secondsToTime(played * duration)} </Typography>
    </>
  );
};
export default PlayedTime;
