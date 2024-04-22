import React from 'react';
import RecipeCard from './RecipeCard';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



export default function ActionAreaCard({ recipes }) {

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} minHeight={400} display="flex" justifyContent="center" alignItems="center" width={'100%'}>
      {recipes.map((recipe, index) => (
        <React.Fragment key={index}>
          {(index + 2) % 3 === 0 && index !== recipes.length - 1 && <AdSlot />}
          <Grid item xs={3} sm={3} md={3} display="flex" justifyContent="center" alignItems="center">
          <RecipeCard key={recipe.id} recipe={recipe} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

function AdSlot() {
  return (
    <Card sx={{ width: 400, height: 400, boxShadow: 3 }}>
      <CardContent>
        {/* Your AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-8683472106710311"
          data-ad-slot="6779483922"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
      </CardContent>
    </Card>
  );
}
