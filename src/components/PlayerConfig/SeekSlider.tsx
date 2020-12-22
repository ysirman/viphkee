import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { PLAYER_CONFIG_CHANGE } from "../../actions/playerConfig";

import { secondsToTime } from "../../utils/formatter";

import Slider from "@material-ui/core/Slider";

const SeekSlider: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);
  const loopState = playerState.loopState;

  const seekMarks = [
    { value: 0, label: secondsToTime(0) },
    { value: 0.25, label: secondsToTime(playerState.duration * 0.25) },
    { value: 0.5, label: secondsToTime(playerState.duration * 0.5) },
    { value: 0.75, label: secondsToTime(playerState.duration * 0.75) },
    { value: 0.999999, label: secondsToTime(playerState.duration) },
  ];

  const handleSeekMouseDown = (_: any) => {
    dispatch({
      type: PLAYER_CONFIG_CHANGE,
      state: {
        ...playerState,
        seeking: true,
      },
    });
  };

  const handleSeekChange = (_: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          seeking: true,
          played: newValue,
        },
      });
    }
  };

  const handleSeekMouseUp = (_: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          seeking: false,
          seekValue: newValue,
        },
      });
    }
  };

  return (
    <>
      <Slider
        min={0}
        max={0.999999}
        step={0.000001}
        color={loopState.isLoop ? "secondary" : "primary"}
        value={playerState.played}
        marks={seekMarks}
        valueLabelDisplay={"auto"}
        valueLabelFormat={(v) => secondsToTime(v * playerState.duration)}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onChangeCommitted={handleSeekMouseUp}
      />
    </>
  );
};
export default SeekSlider;
