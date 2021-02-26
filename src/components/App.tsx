import React, { useState, useReducer, useEffect } from "react";
import Ajv from "ajv";

import PlayerContext from "../contexts/PlayerContext";
import reducer from "../reducers";
import { State } from "../Types";
import theme from "../theme";

import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";
import SideSearchMenu from "./SideSearchMenu";
import FlashMessage from "./FlashMessage";
import Main from "./Main";
import ScrollToTop from "./ScrollTop";

import { APP_KEY } from "../utils/constants";
import { StateSchema } from "../StateSchema";

import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

const leftDrawerWidth = 240;
const rightDrawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
      minHeight: "100vh",
      paddingBottom: "60px",
    },
    content: {
      flexGrow: 2,
      padding: theme.spacing(0),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -leftDrawerWidth,
      marginRight: -rightDrawerWidth,
    },
    contentLeftShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    contentRightShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    contentBothShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
    },
    footer: {
      width: "100%",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    footerLeftShift: {
      width: `calc(100% - ${leftDrawerWidth}px)`,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    footerRightShift: {
      width: `calc(100% - ${rightDrawerWidth}px)`,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    footerBothShift: {
      width: `calc(100% - ${leftDrawerWidth}px - ${rightDrawerWidth}px)`,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

const App: React.FC = () => {
  const initialState = (): State => {
    const defaultState = {
      playList: [],
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
    const appKeyLocalStorageData = localStorage.getItem(APP_KEY);
    if (!appKeyLocalStorageData) return defaultState;

    const appState = JSON.parse(appKeyLocalStorageData);
    const ajv = new Ajv();
    const validate = ajv.compile(StateSchema);
    if (validate(appState)) return appState as State;

    return defaultState;
  };

  const [state, dispatch] = useReducer(reducer, initialState());
  const classes = useStyles();
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CssBaseline />
          <FlashMessage />
          <ScrollToTop />
          <HeaderMenu
            leftMenuOpen={leftMenuOpen}
            rightMenuOpen={rightMenuOpen}
            setLeftMenuOpen={setLeftMenuOpen}
            setRightMenuOpen={setRightMenuOpen}
          />
          <SideMenu menuOpen={leftMenuOpen} setMenuOpen={setLeftMenuOpen} />
          <Main
            mainClassName={clsx(classes.content, {
              [classes.contentLeftShift]: !!(leftMenuOpen && !rightMenuOpen),
              [classes.contentRightShift]: !!(!leftMenuOpen && rightMenuOpen),
              [classes.contentBothShift]: !!(leftMenuOpen && rightMenuOpen),
            })}
            footerClassName={clsx(classes.footer, {
              [classes.footerLeftShift]: !!(leftMenuOpen && !rightMenuOpen),
              [classes.footerRightShift]: !!(!leftMenuOpen && rightMenuOpen),
              [classes.footerBothShift]: !!(leftMenuOpen && rightMenuOpen),
            })}
          />
          <SideSearchMenu
            menuOpen={rightMenuOpen}
            setMenuOpen={setRightMenuOpen}
          />
        </PlayerContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
