import React, { useState } from "react";

import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@material-ui/icons/Search";

const SearchForm: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sm={11} xs={10}>
        <TextField
          className="searchKeyword"
          id="outlined-basic"
          label="Search"
          fullWidth
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Grid>
      <Grid item sm={1} xs={2}>
        <Link to="/search">
          <Button className="searchButton" variant="contained" color="primary">
            <SearchIcon />
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
export default SearchForm;
