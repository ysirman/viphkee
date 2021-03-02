import React from "react";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import "./LoopTimeUpDown.css";

const LoopTimeUpDown: React.FC<{
  handleLoopTimeUpDown: (plusOrMinus: number) => void;
}> = ({ handleLoopTimeUpDown }) => {
  return (
    <Grid item className="loopTime-arrowIcon">
      <IconButton>
        <ArrowDropUpIcon onClick={() => handleLoopTimeUpDown(1)} />
      </IconButton>
      <IconButton>
        <ArrowDropDownIcon onClick={() => handleLoopTimeUpDown(-1)} />
      </IconButton>
    </Grid>
  );
};
export default React.memo(LoopTimeUpDown);
