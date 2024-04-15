import React from 'react';
import RecipeCard from './RecipeCard';
import Grid from '@mui/material/Unstable_Grid2';


const RecipeList = ({ recipes }) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} minHeight={400} display="flex"  justifyContent="center" alignItems="center">
    {recipes.map((recipe, index) => (
      <Grid xs={3} sm={3} md={3} key={index} display="flex"  justifyContent="center" alignItems="center">
        <RecipeCard key={recipe.id} recipe={recipe} />
      </Grid>
    ))}
  </Grid>
  );
};

export default RecipeList;
