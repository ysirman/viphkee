import React from "react";

import VideoList from "../../containers/templates/VideoList";

import Box from "@material-ui/core/Box";

const SearchVideo: React.FC = () => {
  return (
    <Box pt={3}>
      <VideoList />
    </Box>
  );
};

export default SearchVideo;
