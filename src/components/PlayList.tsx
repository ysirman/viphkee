import React from "react";

import PlayListItem from "./PlayListItem";

import List from "@material-ui/core/List";

const PlayList: React.FC = () => {
  return (
    <List>
      {["I2_kfNM8iVo", "9L1F4r7a83U", "v5jo1c_DGTw", "m_bp-MqFL40"].map(
        (id, index) => (
          <PlayListItem key={index} videoId={id} />
        )
      )}
    </List>
  );
};
export default PlayList;
