import React, { useState, useReducer, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import Ajv from "ajv";

import PlayerContext from "../contexts/PlayerContext";
import reducer from "../reducers";
import { State } from "../Types";
import theme from "../theme";

import PlayerPage from "./pages/PlayerPage";
import SearchVideo from "./pages/SearchVideo";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";
import FlashMessage from "./FlashMessage";
import Footer from "./Footer";

import { APP_KEY } from "../utils/constants";
import { StateSchema } from "../StateSchema";

import clsx from "clsx";
import { Box, ThemeProvider } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;

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
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    footer: {
      width: "100%",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    footerShift: {
      width: `calc(100% - ${drawerWidth}px)`,
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

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
            <Box mt={"64px"} mb={4}>
              <Switch>
                <Route exact path="/">
                  <PlayerPage />
                </Route>
                <>
                  <Box p={3}>
                    <Route path="/search" component={SearchVideo} />
                    <Route path="/privacy_policy" component={PrivacyPolicy} />
                  </Box>
                </>
                <Redirect to="/" />;
              </Switch>
            </Box>
            <Footer
              className={clsx(classes.footer, {
                [classes.footerShift]: menuOpen,
              })}
            />
          </main>
        </PlayerContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
