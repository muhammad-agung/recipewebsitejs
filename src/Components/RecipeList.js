import React from 'react';
import RecipeCard from './RecipeCard';
import Grid from '@mui/material/Unstable_Grid2';
// import AdsComponent from '../Components/Ads/AdsComponent';



export default function RecipeList({ recipes }) {

  return (
    <div>
    <Grid container spacing={2} justifyContent="center" paddingLeft={2} width={'100%'}>
      {recipes.map((recipe) => (
        <Grid key={recipe.id} xs={16} sm={8} md={4}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
} 