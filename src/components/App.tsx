import React, { useState, useReducer } from "react";

import PlayerContext from "../contexts/PlayerContext";
import reducer from "../reducers";
import { State } from "../Types";

import Player from "./Player";
import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";

import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 2,
      padding: theme.spacing(0),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const App: React.FC = () => {
  const initialState: State = {
    playList: [
      { id: 1, videoId: "I2_kfNM8iVo", videoTitle: "dummy video title 1" },
      { id: 2, videoId: "9L1F4r7a83U", videoTitle: "dummy video title 2" },
      { id: 3, videoId: "v5jo1c_DGTw", videoTitle: "dummy video title 3" },
      { id: 4, videoId: "m_bp-MqFL40", videoTitle: "dummy video title 4" },
    ],
    playerConfig: {
      url: "https://www.youtube.com/watch?v=I2_kfNM8iVo",
      playing: true,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loopState: {
        isLoop: false,
        start: "0:00",
        end: "0:00",
      },
      zoomState: {
        isZoom: false,
        min: 0,
        max: 100,
      },
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <PlayerContext.Provider value={{ state, dispatch }}>
        <CssBaseline />
        <HeaderMenu open={open} setOpen={setOpen} />
        <SideMenu open={open} setOpen={setOpen} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Box mt={"64px"}>
            <Player />
          </Box>
        </main>
      </PlayerContext.Provider>
    </div>
  );
};

export default App;
