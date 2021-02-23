import React from "react";

import VideoList from "../VideoList";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const SearchVideo: React.FC = () => {
  return (
    <Box pt={3}>
      <Grid className="videoList" container spacing={3} justify="center">
        <VideoList />
      </Grid>
    </Box>
  );
};

export default SearchVideo;
