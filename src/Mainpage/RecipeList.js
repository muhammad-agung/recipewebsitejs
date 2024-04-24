import React from 'react';
import RecipeCard from './RecipeCard';
import Grid from '@mui/material/Unstable_Grid2';
// import AdsComponent from '../Components/Ads/AdsComponent';



export default function ActionAreaCard({ recipes }) {

  return (
    <div>
    <Grid container spacing={2} justifyContent="center" padding={2}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={16} sm={8} md={4}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
} 