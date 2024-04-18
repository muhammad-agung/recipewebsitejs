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

export default function ActionAreaCard({ recipe }) {
  const [count, setCount] = useState(0); // Initialize count as 0
  const [averageRating, setAverageRating] = useState(0); // Initialize averageRating as 0

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        // Create a reference to the counter document for the specific recipe
        const counterRef = firebase.firestore().collection('recipeCounters').doc(recipe.id);

        // Fetch the counter document
        const snapshot = await counterRef.get();

        // If the document exists, update the count state with the fetched count value
        if (snapshot.exists && snapshot.data().count !== undefined) {
          setCount(snapshot.data().count);
        }
      } catch (error) {
        console.error('Error fetching counter:', error);
      }
    };

    fetchCounter();
  }, [recipe.id]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        // Create a reference to the rating document for the specific recipe
        const ratingRef = firebase.firestore().collection('recipeRatings').doc(recipe.id);

        // Fetch the rating document
        const snapshot = await ratingRef.get();

        // If the document exists, calculate the average rating
        if (snapshot.exists) {
          const data = snapshot.data();
          const totalRatings = Object.values(data).reduce((acc, curr) => acc + curr, 0);
          const totalStars = Object.keys(data).reduce((acc, curr) => acc + parseInt(curr) * data[curr], 0);
          const averageRating = totalStars / totalRatings;

          setAverageRating(averageRating);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [recipe.id]);

  return (
    <Card sx={{ width: 400, boxShadow: 3 }}>
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`}  state={{ currentRecipe: recipe }}>
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
