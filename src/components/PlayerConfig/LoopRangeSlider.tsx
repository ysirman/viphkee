import React, { useContext, useState, useEffect } from "react";

import PlayerContext from "../../contexts/PlayerContext";
import { updatePlayerConfig } from "../../actions/playerConfig";

import { secondsToTime, timeToSeconds } from "../../utils/formatter";

import Slider from "@material-ui/core/Slider";

const LoopRangeSlider: React.FC = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const playerConfig = state.playerConfig;
  const loopState = playerConfig.loopState;
  const zoomState = playerConfig.zoomState;
  const isVideoLoaded = playerConfig.url !== "";
  const [loopTime, setLoopTime] = useState([0, 0]);

  useEffect(() => {
    setLoopTime([
      (timeToSeconds(loopState.start) / playerConfig.duration) * 100,
      (timeToSeconds(loopState.end) / playerConfig.duration) * 100,
    ]);
  }, [loopState]);

  const loopMarks = [
    { value: 0, label: secondsToTime(0) },
    { value: 25, label: secondsToTime(playerConfig.duration * 0.25) },
    { value: 50, label: secondsToTime(playerConfig.duration * 0.5) },
    { value: 75, label: secondsToTime(playerConfig.duration * 0.75) },
    { value: 100, label: secondsToTime(playerConfig.duration) },
  ];

  const zoomMarks = () => {
    const zoomMarksBaseValue = (zoomState.max - zoomState.min) / 4;
    return [
      {
        value: zoomState.min,
        label: secondsToTime((playerConfig.duration * zoomState.min) / 100),
      },
      {
        value: zoomState.min + zoomMarksBaseValue,
        label: secondsToTime(
          (playerConfig.duration * (zoomState.min + zoomMarksBaseValue)) / 100
        ),
      },
      {
        value: zoomState.min + zoomMarksBaseValue * 2,
        label: secondsToTime(
          (playerConfig.duration * (zoomState.min + zoomMarksBaseValue * 2)) /
            100
        ),
      },
      {
        value: zoomState.max - zoomMarksBaseValue,
        label: secondsToTime(
          (playerConfig.duration * (zoomState.max - zoomMarksBaseValue)) / 100
        ),
      },
      {
        value: zoomState.max,
        label: secondsToTime((playerConfig.duration * zoomState.max) / 100),
      },
    ];
  };

  const handleChangeLoopRange = (newValue: number[]) => {
    dispatch(
      updatePlayerConfig({
        ...playerConfig,
        loopState: {
          ...loopState,
          start: secondsToTime((newValue[0] / 100) * playerConfig.duration),
          end: secondsToTime((newValue[1] / 100) * playerConfig.duration),
        },
      })
    );
  };

  return (
    <>
      <Slider
        min={zoomState.isZoom ? zoomState.min : 0}
        max={zoomState.isZoom ? zoomState.max : 100}
        step={0.0000000001}
        color={zoomState.isZoom ? "secondary" : "primary"}
        value={loopTime}
        getAriaLabel={(index) =>
          index === 0 ? "Start loop time" : "End loop time"
        }
        defaultValue={[
          (timeToSeconds(loopState.start) / playerConfig.duration) * 100,
          (timeToSeconds(loopState.end) / playerConfig.duration) * 100,
        ]}
        marks={zoomState.isZoom ? zoomMarks() : loopMarks}
        valueLabelDisplay={"auto"}
        valueLabelFormat={(v) =>
          secondsToTime((v / 100) * playerConfig.duration)
        }
        onChange={(_, v) => setLoopTime(v as number[])}
        onChangeCommitted={(_, v) => handleChangeLoopRange(v as number[])}
        disabled={!isVideoLoaded}
      />
    </>
  );
};
export default LoopRangeSlider;
