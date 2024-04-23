import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import {Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value); // Pass the search term to the parent component
  };

  const handleCategory = event => {
    const value = event.target.value;
    setSearchTerm(value);
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={category}
          onChange={handleCategory}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h3" sx={{ margin: '60px', color: 'black', fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>Latest and Greatest</Typography>
    </div>
  );
};

export default SearchBar;
