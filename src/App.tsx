import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

import { PlayerState, Progress } from "./Types";

import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";

const App: React.FC = () => {
  const inputUrlEl = useRef(document.createElement("input"));
  const initialState: PlayerState = {
    url: "https://www.youtube.com/watch?v=I2_kfNM8iVo",
    playing: true,
    seeking: false,
    volume: 0.3,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
  };
  const [state, setState] = useState(initialState);
  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const [loopState, setLoopState] = useState({
    isLoop: false,
    start: "0:00",
    end: "0:00",
  });
  const [zoomState, setZoomState] = useState({
    isZoom: false,
    min: 0,
    max: 100,
  });

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
    if (validateHHMMSS(loopState.end)) {
      return;
    }
    setLoopState({ ...loopState, isLoop: !loopState.isLoop });
  };

  const handleLoopStart = (loopStart: string) => {
    if (loopStart === "") {
      loopStart = "0:00";
    }
    console.log("set loop start time:", loopStart);
    setLoopState({ ...loopState, start: loopStart });
  };

  const handleLoopEnd = (loopEnd: string): void => {
    if (loopEnd === "") {
      loopEnd = "0:00";
    }
    console.log("set loop end time:", loopEnd);
    setLoopState({ ...loopState, end: loopEnd });
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

  const handlePlaybackRate = (plusOrMinus: number) => {
    const rate = state.playbackRate + plusOrMinus * 0.25;
    if (rate < 0.25) {
      return;
    }
    setState({ ...state, playbackRate: rate });
  };

  const handleProgress = (progress: Progress) => {
    // console.log('onProgress', state)
    const loopEndRate = timeToSeconds(loopState.end) / state.duration;
    if (loopState.isLoop === true && progress.played > loopEndRate) {
      console.log("LOOP!!");
      const loopStartRate = timeToSeconds(loopState.start) / state.duration;
      if (player !== null) {
        player.seekTo(loopStartRate);
      }
    }
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState({ ...state, played: progress.played, loaded: progress.loaded });
    }
  };

  const handleDuration = (duration: number) => {
    console.log("onDuration", duration);
    setState({ ...state, duration: duration });
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
    { value: 0.25, label: secondsToTime(state.duration * 0.25) },
    { value: 0.5, label: secondsToTime(state.duration * 0.5) },
    { value: 0.75, label: secondsToTime(state.duration * 0.75) },
    { value: 0.999999, label: secondsToTime(state.duration) },
  ];

  const loopMarks = [
    { value: 0, label: secondsToTime(0) },
    { value: 25, label: secondsToTime(state.duration * 0.25) },
    { value: 50, label: secondsToTime(state.duration * 0.5) },
    { value: 75, label: secondsToTime(state.duration * 0.75) },
    { value: 100, label: secondsToTime(state.duration) },
  ];

  const zoomMarks = () => {
    const zoomMarksBaseValue = (zoomState.max - zoomState.min) / 4;
    return [
      {
        value: zoomState.min,
        label: secondsToTime((state.duration * zoomState.min) / 100),
      },
      {
        value: zoomState.min + zoomMarksBaseValue,
        label: secondsToTime(
          (state.duration * (zoomState.min + zoomMarksBaseValue)) / 100
        ),
      },
      {
        value: zoomState.min + zoomMarksBaseValue * 2,
        label: secondsToTime(
          (state.duration * (zoomState.min + zoomMarksBaseValue * 2)) / 100
        ),
      },
      {
        value: zoomState.max - zoomMarksBaseValue,
        label: secondsToTime(
          (state.duration * (zoomState.max - zoomMarksBaseValue)) / 100
        ),
      },
      {
        value: zoomState.max,
        label: secondsToTime((state.duration * zoomState.max) / 100),
      },
    ];
  };

  const handleChangeRange = (_: any, newValue: number | number[]) => {
    if (newValue instanceof Array) {
      setLoopState({
        ...loopState,
        start: secondsToTime((newValue[0] / 100) * state.duration),
        end: secondsToTime((newValue[1] / 100) * state.duration),
      });
    }
  };

  const handleSeekMouseDown = (_: any) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekChange = (_: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setState({ ...state, played: newValue });
    }
  };

  const handleSeekMouseUp = (_: any, newValue: number | number[]) => {
    setState({ ...state, seeking: false });
    if (player !== null && typeof newValue === "number") {
      player.seekTo(newValue);
    }
  };

  const handleZooming = (_: any) => {
    if (zoomState.isZoom === false && loopState.end !== "0:00") {
      const min = (timeToSeconds(loopState.start) / state.duration) * 100 - 5;
      const max = (timeToSeconds(loopState.end) / state.duration) * 100 + 5;
      setZoomState({
        isZoom: true,
        min: min < 0 ? 0 : min,
        max: max > 100 ? 100 : max,
      });
    } else {
      setZoomState({ ...zoomState, isZoom: false });
    }
  };

  return (
    <Box className="App" m={5}>
      <ReactPlayer
        ref={(ref) => setPlayer(ref)}
        className="react-player"
        width="100%"
        height="100%"
        url={state.url}
        volume={state.volume}
        playing={state.playing}
        playbackRate={state.playbackRate}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onError={(e) => console.log("onError", e)}
        onProgress={(state) => handleProgress(state)}
        onDuration={(state) => handleDuration(state)}
      />
      <h2>Setting</h2>
      <Box>
        <h3>Seek:{secondsToTime(state.duration * state.played)}</h3>
        <Slider
          min={0}
          max={0.999999}
          step={0.000001}
          value={state.played}
          marks={seekMarks}
          valueLabelDisplay={"auto"}
          valueLabelFormat={(v) => secondsToTime(v * state.duration)}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onChangeCommitted={handleSeekMouseUp}
        />
      </Box>
      <Box mb={5}>
        <h3>
          Loop:
          <button onClick={handleZooming}>
            {zoomState.isZoom ? "拡大解除する" : "拡大する"}
          </button>
        </h3>
        <Slider
          min={zoomState.isZoom ? zoomState.min : 0}
          max={zoomState.isZoom ? zoomState.max : 100}
          step={0.0000000001}
          value={[
            (timeToSeconds(loopState.start) / state.duration) * 100,
            (timeToSeconds(loopState.end) / state.duration) * 100,
          ]}
          getAriaLabel={(index) =>
            index === 0 ? "Start loop time" : "End loop time"
          }
          defaultValue={[
            (timeToSeconds(loopState.start) / state.duration) * 100,
            (timeToSeconds(loopState.end) / state.duration) * 100,
          ]}
          marks={zoomState.isZoom ? zoomMarks() : loopMarks}
          valueLabelDisplay={"auto"}
          valueLabelFormat={(v) => secondsToTime((v / 100) * state.duration)}
          onChange={handleChangeRange}
        />
        <input
          type="checkbox"
          checked={loopState.isLoop}
          onChange={handleLooping}
        />
        <input
          type="text"
          placeholder="Loop Start"
          value={loopState.start}
          onChange={(e) => handleLoopStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="Loop End"
          value={loopState.end}
          onChange={(e) => handleLoopEnd(e.target.value)}
        />
      </Box>
      <table>
        <tbody>
          <tr>
            <th>Custom URL</th>
            <td>
              <input ref={inputUrlEl} type="text" placeholder="Enter URL" />
              <button
                onClick={() =>
                  setState({ ...state, url: inputUrlEl.current.value })
                }
              >
                Load
              </button>
            </td>
          </tr>
          <tr>
            <th>Volume</th>
            <td>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={state.volume}
                onChange={(e) =>
                  setState({ ...state, volume: parseFloat(e.target.value) })
                }
              />
            </td>
          </tr>
          <tr>
            <th>速度</th>
            <td>
              {state.playbackRate}
              <br />
              <button
                onClick={() => {
                  handlePlaybackRate(-1);
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  setState({ ...state, playbackRate: 1 });
                }}
              >
                reset
              </button>
              <button
                onClick={() => {
                  handlePlaybackRate(1);
                }}
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>State</h2>
      <table>
        <tbody>
          <tr>
            <th>url</th>
            <td>{state.url}</td>
          </tr>
          <tr>
            <th>volume</th>
            <td>{state.volume.toFixed(3)}</td>
          </tr>
          <tr>
            <th>played</th>
            <td>{state.played}</td>
          </tr>
          <tr>
            <th>elapsed</th>
            <td>{secondsToTime(state.duration * state.played)}</td>
          </tr>
          <tr>
            <th>
              elapsed
              <br />
              (unformat)
            </th>
            <td>{state.duration * state.played}</td>
          </tr>
          <tr>
            <th>duration</th>
            <td>{secondsToTime(state.duration)}</td>
          </tr>
          <tr>
            <th>
              duration
              <br />
              (unformat)
            </th>
            <td>{state.duration}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default App;
