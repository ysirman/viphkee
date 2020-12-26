import React, { useContext } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { PLAYER_CONFIG_CHANGE } from "../../actions/playerConfig";

import { secondsToTime, timeToSeconds } from "../../utils/formatter";

import Slider from "@material-ui/core/Slider";

const LoopRangeSlider: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);
  const loopState = playerState.loopState;
  const zoomState = playerState.zoomState;

  const loopMarks = [
    { value: 0, label: secondsToTime(0) },
    { value: 25, label: secondsToTime(playerState.duration * 0.25) },
    { value: 50, label: secondsToTime(playerState.duration * 0.5) },
    { value: 75, label: secondsToTime(playerState.duration * 0.75) },
    { value: 100, label: secondsToTime(playerState.duration) },
  ];

  const zoomMarks = () => {
    const zoomMarksBaseValue = (zoomState.max - zoomState.min) / 4;
    return [
      {
        value: zoomState.min,
        label: secondsToTime((playerState.duration * zoomState.min) / 100),
      },
      {
        value: zoomState.min + zoomMarksBaseValue,
        label: secondsToTime(
          (playerState.duration * (zoomState.min + zoomMarksBaseValue)) / 100
        ),
      },
      {
        value: zoomState.min + zoomMarksBaseValue * 2,
        label: secondsToTime(
          (playerState.duration * (zoomState.min + zoomMarksBaseValue * 2)) /
            100
        ),
      },
      {
        value: zoomState.max - zoomMarksBaseValue,
        label: secondsToTime(
          (playerState.duration * (zoomState.max - zoomMarksBaseValue)) / 100
        ),
      },
      {
        value: zoomState.max,
        label: secondsToTime((playerState.duration * zoomState.max) / 100),
      },
    ];
  };

  const handleChangeLoopRange = (_: any, newValue: number | number[]) => {
    if (newValue instanceof Array) {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          loopState: {
            ...loopState,
            start: secondsToTime((newValue[0] / 100) * playerState.duration),
            end: secondsToTime((newValue[1] / 100) * playerState.duration),
          },
        },
      });
    }
  };

  return (
    <>
      <Slider
        min={zoomState.isZoom ? zoomState.min : 0}
        max={zoomState.isZoom ? zoomState.max : 100}
        step={0.0000000001}
        color={zoomState.isZoom ? "secondary" : "primary"}
        value={[
          (timeToSeconds(loopState.start) / playerState.duration) * 100,
          (timeToSeconds(loopState.end) / playerState.duration) * 100,
        ]}
        getAriaLabel={(index) =>
          index === 0 ? "Start loop time" : "End loop time"
        }
        defaultValue={[
          (timeToSeconds(loopState.start) / playerState.duration) * 100,
          (timeToSeconds(loopState.end) / playerState.duration) * 100,
        ]}
        marks={zoomState.isZoom ? zoomMarks() : loopMarks}
        valueLabelDisplay={"auto"}
        valueLabelFormat={(v) =>
          secondsToTime((v / 100) * playerState.duration)
        }
        onChange={handleChangeLoopRange}
      />
    </>
  );
};
export default LoopRangeSlider;