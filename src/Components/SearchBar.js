import React from 'react';
import {Typography, InputAdornment, TextField, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ handleSearch, pageTitle }) => {


  const handleChange = event => {
    const value = event.target.value;
    handleSearch(value); // Pass the search term to the parent component
  };

  return (
    <div className="search-bar" style={{textAlign: 'center', margin: 50}}>
      <Typography variant="h2" sx={{ margin: '60px', color: 'black', fontFamily:"Kaushan Script, cursive"}}>{pageTitle}</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="filled-search"
          label="Search Recipe"
          type="search"
          variant="filled"
          color="primary"
          onChange={handleChange}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}

      />
     </FormControl>
    </div>
  );
};

export default SearchBar;
