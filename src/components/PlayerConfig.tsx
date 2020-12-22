import React, { useContext, useRef } from "react";

import PlayerContext from "../contexts/PlayerContext";
import { PLAYER_CONFIG_CHANGE } from "../actions/playerConfig";

import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import VolumeUp from "@material-ui/icons/VolumeUp";
import LoopIcon from "@material-ui/icons/Loop";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FastForwardIcon from "@material-ui/icons/FastForward";
import ScheduleIcon from "@material-ui/icons/Schedule";

const PlayerConfig: React.FC = () => {
  const { playerState, dispatch } = useContext(PlayerContext);
  const loopState = playerState.loopState;
  const zoomState = playerState.zoomState;
  const inputUrlEl = useRef(document.createElement("input"));

  const validateHHMMSS = (hhmmdd: string): boolean => {
    if (hhmmdd.match(/^([1-9]:)?([0-5]?[0-9]:)?([0-5]?[0-9])$/) === null) {
      console.log("Invalid time format:", hhmmdd);
      return true;
    }
    return false;
  };
  const handleLooping = () => {
    if (validateHHMMSS(loopState.start)) {
      return;
    }
    if (validateHHMMSS(loopState.end) || loopState.end === "0:00") {
      return;
    }
    dispatch({
      type: PLAYER_CONFIG_CHANGE,
      state: {
        ...playerState,
        loopState: { ...loopState, isLoop: !loopState.isLoop },
      },
    });
  };

  const handleLoopStart = (loopStart: string) => {
    if (loopStart === "") {
      loopStart = "0:00";
    }
    console.log("set loop start time:", loopStart);
    dispatch({
      type: PLAYER_CONFIG_CHANGE,
      state: {
        ...playerState,
        loopState: { ...loopState, start: loopStart },
      },
    });
  };

  const handleLoopEnd = (loopEnd: string): void => {
    if (loopEnd === "") {
      loopEnd = "0:00";
    }
    console.log("set loop end time:", loopEnd);
    dispatch({
      type: PLAYER_CONFIG_CHANGE,
      state: {
        ...playerState,
        loopState: { ...loopState, end: loopEnd },
      },
    });
  };

  const timeToSeconds = (time: string): number => {
    const timeArray = time.split(":");
    if (timeArray.length === 2) {
      return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    }
    if (timeArray.length === 3) {
      return (
        parseInt(timeArray[0]) * 3600 +
        parseInt(timeArray[1]) * 60 +
        parseInt(timeArray[2])
      );
    }
    return parseInt(time);
  };

  const handlePlaybackRate = (_: any, rate: number | number[]) => {
    if (typeof rate === "number") {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          playbackRate: rate,
        },
      });
    }
  };

  const pad = (number: number) => {
    return ("0" + number).slice(-2);
  };
  const secondsToTime = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const seekMarks = [
    { value: 0, label: secondsToTime(0) },
    { value: 0.25, label: secondsToTime(playerState.duration * 0.25) },
    { value: 0.5, label: secondsToTime(playerState.duration * 0.5) },
    { value: 0.75, label: secondsToTime(playerState.duration * 0.75) },
    { value: 0.999999, label: secondsToTime(playerState.duration) },
  ];

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

  const handleChangeRange = (_: any, newValue: number | number[]) => {
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

  const handleZooming = (_: any) => {
    if (zoomState.isZoom === false && loopState.end !== "0:00") {
      const min =
        (timeToSeconds(loopState.start) / playerState.duration) * 100 - 5;
      const max =
        (timeToSeconds(loopState.end) / playerState.duration) * 100 + 5;
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          zoomState: {
            isZoom: true,
            min: min < 0 ? 0 : min,
            max: max > 100 ? 100 : max,
          },
        },
      });
    } else {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          zoomState: { ...zoomState, isZoom: false },
        },
      });
    }
  };

  const handleVolume = (_: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          volume: newValue,
        },
      });
    }
  };

  const handleLoopStartUpDown = (plusOrMinus: number) => {
    const newStartValue = timeToSeconds(loopState.start) + 1 * plusOrMinus;
    if (newStartValue >= 0 && newStartValue < timeToSeconds(loopState.end)) {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          loopState: { ...loopState, start: secondsToTime(newStartValue) },
        },
      });
    }
  };

  const handleLoopEndUpDown = (plusOrMinus: number) => {
    const newEndValue = timeToSeconds(loopState.end) + 1 * plusOrMinus;
    if (
      newEndValue <= playerState.duration &&
      newEndValue > timeToSeconds(loopState.start)
    ) {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          loopState: { ...loopState, end: secondsToTime(newEndValue) },
        },
      });
    }
  };

  const handleUrlLoadButton = (url: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (pattern.test(url)) {
      dispatch({
        type: PLAYER_CONFIG_CHANGE,
        state: {
          ...playerState,
          url: url,
        },
      });
    }
  };

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
          <Grid container item xs={2} alignItems="center">
            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item xs>
              <Slider
                min={0}
                max={1}
                step={0.01}
                marks={[
                  { value: 0.3, label: 0.3 },
                  { value: 0.7, label: 0.7 },
                ]}
                valueLabelDisplay={"auto"}
                value={playerState.volume}
                onChange={handleVolume}
                aria-labelledby="continuous-slider"
              />
            </Grid>
          </Grid>
          <Grid container item xs spacing={1} alignItems="center">
            <Grid item>
              <FastForwardIcon />
            </Grid>
            <Grid item xs>
              <Slider
                min={0.01}
                max={2}
                step={0.01}
                marks={[
                  { value: 0.5, label: 0.5 },
                  { value: 1, label: 1 },
                  { value: 1.5, label: 1.5 },
                  { value: 2, label: 2 },
                ]}
                valueLabelDisplay={"auto"}
                color={"secondary"}
                value={playerState.playbackRate}
                onChange={handlePlaybackRate}
              />
            </Grid>
          </Grid>
        </Grid>
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
      </Box>
      <Box>
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
          onChange={handleChangeRange}
        />
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <LoopIcon color={loopState.isLoop ? "action" : "disabled"} />
              </Grid>
              <Grid item>
                <Switch checked={loopState.isLoop} onChange={handleLooping} />
              </Grid>
              <Grid item>
                <ZoomOutMapIcon
                  color={zoomState.isZoom ? "action" : "disabled"}
                />
              </Grid>
              <Grid item>
                <Switch checked={zoomState.isZoom} onChange={handleZooming} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid container item xs alignItems="center">
                <Grid item>
                  <TextField
                    label="Loop Start"
                    variant="outlined"
                    size="small"
                    value={loopState.start}
                    onChange={(e) => handleLoopStart(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <div>
                    <ArrowDropUpIcon onClick={() => handleLoopStartUpDown(1)} />
                  </div>
                  <div>
                    <ArrowDropDownIcon
                      onClick={() => handleLoopStartUpDown(-1)}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container item xs alignItems="center">
                <Grid item>
                  <TextField
                    label="Loop End"
                    variant="outlined"
                    size="small"
                    value={loopState.end}
                    onChange={(e) => handleLoopEnd(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <div>
                    <ArrowDropUpIcon onClick={() => handleLoopEndUpDown(1)} />
                  </div>
                  <div>
                    <ArrowDropDownIcon
                      onClick={() => handleLoopEndUpDown(-1)}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item sm={11} xs={10}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Enter video URL
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              inputRef={inputUrlEl}
              labelWidth={120}
            />
          </FormControl>
        </Grid>
        <Grid item sm={1} xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUrlLoadButton(inputUrlEl.current.value)}
          >
            Load
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PlayerConfig;
