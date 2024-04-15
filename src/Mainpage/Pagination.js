import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleChange = (event, value) => {
    paginate(value)
  };

  return (
    <Stack spacing={2} sx={{ display:"flex" , justifyContent:"center", alignItems:"center", marginTop : 10 }}>
        <Pagination count={pageNumbers.length} variant="outlined" color="primary" onChange={handleChange}/>
    </Stack>
  );
};

export default PaginationComponent;
