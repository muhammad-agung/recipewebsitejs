import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Rating from '@mui/material/Rating';

export default function ActionAreaCard({ recipe, index }) {
  const [count, setCount] = useState(0); // Initialize count as 0
  const [averageRating, setAverageRating] = useState(0); // Initialize averageRating as 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counter data
        const counterRef = firebase.firestore().collection('recipeCounters').doc(recipe.id);
        const counterSnapshot = await counterRef.get();
        if (counterSnapshot.exists && counterSnapshot.data().count !== undefined) {
          setCount(counterSnapshot.data().count);
        }
  
        // Fetch average rating data
        const ratingRef = firebase.firestore().collection('recipeRatings').doc(recipe.id);
        const ratingSnapshot = await ratingRef.get();
        if (ratingSnapshot.exists) {
          const data = ratingSnapshot.data();
          const totalRatings = Object.values(data).reduce((acc, curr) => acc + curr, 0);
          const totalStars = Object.keys(data).reduce((acc, curr) => acc + parseInt(curr) * data[curr], 0);
          const averageRating = totalStars / totalRatings;
          setAverageRating(averageRating);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [recipe.id]);

  // Check if the current recipe index is a multiple of 4 (excluding the first one)
  const isAdSlot = index > 0 && index % 4 === 0;

  console.log('Index:', index);
  console.log('isAdSlot:', isAdSlot);

  // Render either the recipe card or the ad
  return isAdSlot ? (
    // Render the ad
    <Card sx={{ width: 400, boxShadow: 3 }}>
      <CardContent>
        {/* Your AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8683472106710311"
          data-ad-slot="6779483922"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
      </CardContent>
    </Card>
  ) : (
    // Render the recipe card
    <Card sx={{ width: 400, boxShadow: 3 }}>
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`} state={{ currentRecipe: recipe }}>
        <CardMedia
          component="img"
          height="400"
          image={recipe.thumbnail}
          alt="Recipe"
        />
        <CardContent sx={{ minHeight: 100, backgroundColor: "#FBE9E7" }}>
          <Typography gutterBottom variant="h5" component="div" display="flex"  justifyContent="center" alignItems="center" fontFamily={"'Kalam', cursive"}>
            {recipe.title}
          </Typography>
          <Typography variant="body1" color="text.primary" fontFamily={"'Kalam', cursive"}>
            {recipe.shortDesc}
          </Typography>
          <Stack direction="row" style={{ paddingLeft: 5, paddingTop: 5 }}>
            <VisibilityIcon fontSize='medium'/>
            <Typography style={{paddingRight: 5}}>{count}</Typography >
            <Rating name="recipe-rating" value={averageRating} readOnly />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
