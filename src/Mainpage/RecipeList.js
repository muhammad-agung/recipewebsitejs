import React from 'react';
import RecipeCard from './RecipeCard';
import Grid from '@mui/material/Unstable_Grid2';
// import AdsComponent from '../Components/Ads/AdsComponent';



export default function ActionAreaCard({ recipes }) {

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} minHeight={400} display="flex" justifyContent="center" alignItems="center" width={'100%'}>
      {recipes.map((recipe, index) => (
        <React.Fragment key={index}>
          {/* {(index + 2) % 3 === 0 && index !== recipes.length - 1 && <AdsComponent />} */}
          <Grid item xs={3} sm={3} md={3} display="flex" justifyContent="center" alignItems="center">
          <RecipeCard key={recipe.id} recipe={recipe} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}