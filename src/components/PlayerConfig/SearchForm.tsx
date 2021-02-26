import React, { useState } from "react";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";

import "./SearchForm.css";

const SearchForm: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handlePressEnterKey = (e: React.KeyboardEvent) => {
    const ENTER_KEY_CODE = 13;
    if (e.keyCode !== ENTER_KEY_CODE) return;
    const searchButton = document.querySelector(".searchButton");
    searchButton!.dispatchEvent(new Event("click"));
  };

  return (
    <List component="div">
      <Paper className="searchKeyword">
        <InputBase
          placeholder="Search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handlePressEnterKey}
        />
        <IconButton className="searchButton">
          <SearchIcon />
        </IconButton>
      </Paper>
    </List>
  );
};
export default SearchForm;
