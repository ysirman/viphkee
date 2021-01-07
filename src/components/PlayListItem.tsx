import React from "react";

import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const PlayListItem: React.FC<{ videoId: string }> = ({ videoId }) => {
  return (
    <ListItem button>
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        width="64px"
      />
      <Typography noWrap={true} variant={"caption"}>
        FUYU_sound check vol.1 @ Nagoya Century Hall
      </Typography>
    </ListItem>
  );
};
export default PlayListItem;
