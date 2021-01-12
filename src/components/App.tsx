import React, { useState, useReducer, useEffect } from "react";

import PlayerContext from "../contexts/PlayerContext";
import reducer from "../reducers";
import { State } from "../Types";
import theme from "../theme";

import Player from "./Player";
import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";
import PlayListForm from "./PlayListForm";
import FlashMessage from "./FlashMessage";

import { youtubeUrl } from "../utils/youtubeUrls";

import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core";
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
      {
        id: 1,
        videoId: "I2_kfNM8iVo",
        videoTitle: "dummy video title 1",
        loopStart: "0:10",
        loopEnd: "0:20",
        isSelected: false,
      },
      {
        id: 2,
        videoId: "9L1F4r7a83U",
        videoTitle: "dummy video title 2",
        loopStart: "0:20",
        loopEnd: "0:30",
        isSelected: true,
      },
      {
        id: 3,
        videoId: "v5jo1c_DGTw",
        videoTitle: "dummy video title 3",
        loopStart: "0:30",
        loopEnd: "0:40",
        isSelected: false,
      },
      {
        id: 4,
        videoId: "m_bp-MqFL40",
        videoTitle: "dummy video title 4",
        loopStart: "0:40",
        loopEnd: "0:50",
        isSelected: false,
      },
    ],
    playerConfig: {
      url: "",
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
    flashMessage: {
      isOpen: false,
      message: "",
    },
  };

  useEffect(() => {
    const currentItem = initialState.playList.filter(
      (playListItem) => playListItem.isSelected === true
    )[0];
    initialState.playerConfig.url = youtubeUrl(currentItem.videoId);
    initialState.playerConfig.loopState.start = currentItem.loopStart;
    initialState.playerConfig.loopState.end = currentItem.loopEnd;
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CssBaseline />
          <FlashMessage />
          <HeaderMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: menuOpen,
            })}
          >
            <Box mt={"64px"}>
              <Player />
            </Box>
            <PlayListForm />
          </main>
        </PlayerContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
