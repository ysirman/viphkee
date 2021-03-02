import React, { useState } from "react";

import PlayerProvider from "../contexts/PlayerProvider";
import theme from "../theme";

import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";
import SideSearchMenu from "./SideSearchMenu";
import FlashMessage from "./FlashMessage";
import Main from "./Main";
import ScrollToTop from "./ScrollTop";

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
  const classes = useStyles();
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <PlayerProvider>
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
        </PlayerProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
