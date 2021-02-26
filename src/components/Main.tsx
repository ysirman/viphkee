import React from "react";
import { Redirect, Route, Switch } from "react-router";

import PlayerPage from "./pages/PlayerPage";
import SearchVideo from "./pages/SearchVideo";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import Footer from "./Footer";

import { Box } from "@material-ui/core";

const Main: React.FC<{
  mainClassName: string;
  footerClassName: string;
}> = ({ mainClassName, footerClassName }) => {
  return (
    <main className={mainClassName}>
      <Box mt={"64px"} mb={4}>
        <Switch>
          <Route exact path="/">
            <PlayerPage />
          </Route>
          <Route path="/search" component={SearchVideo} />
          <Route path="/privacy_policy" component={PrivacyPolicy} />
          <Redirect to="/" />;
        </Switch>
      </Box>
      <Footer className={footerClassName} />
    </main>
  );
};

export default Main;
