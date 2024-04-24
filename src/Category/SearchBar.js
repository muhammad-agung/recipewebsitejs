import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ handleSearch }) => {


  const handleChange = event => {
    const value = event.target.value;
    handleSearch(value); // Pass the search term to the parent component
  };

  return (
    <div className="search-bar" style={{textAlign: 'center', margin: 50}}>
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
