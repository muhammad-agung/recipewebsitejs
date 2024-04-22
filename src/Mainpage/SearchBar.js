import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value); // Pass the search term to the parent component
  };

  return (
    <div className="search-bar" style={{textAlign: 'center', margin: 50}}>
      <FormControl>
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
      <Typography variant="h3" sx={{ margin: '60px', color: 'black', fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>Latest and Greatest</Typography>
    </div>
  );
};

export default SearchBar;
