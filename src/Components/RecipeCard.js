import React, { useEffect, useState } from 'react';
import { CardActionArea, Stack, Rating, Typography, CardMedia, CardContent, Card } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink } from 'react-router-dom';
import { firebase } from '../Firebase';

const ActionAreaCard = ({ recipe }) => {
  const [count, setCount] = useState(0); 
  const [averageRating, setAverageRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch view count data
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

    const handleScroll = () => {
      const card = document.getElementById(`recipe-card-${recipe.id}`);
      if (!card) return;

      const cardTop = card.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (cardTop < viewportHeight * 0.75) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility when component mounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, [recipe.id]);

  return (
    <Card
      id={`recipe-card-${recipe.id}`}
      style={{
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : '20px'})`, // Move card from bottom to top
      }}
    >
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`}>
        <CardMedia style={{ height: 400, width: '100%' }} component="img" image={recipe.thumbnail} alt={recipe.thumbnail} />
        <CardContent style={{ minHeight: 130 }}>
          <Typography variant="h6" component="div" style={{ textAlign: 'center' }} sx={{ fontFamily: "Kaushan Script, cursive" }}>
              {recipe.title}
          </Typography>
          <Typography variant="body1" color="text.primary" fontFamily={"cursive"}>
              {recipe.shortDesc}
          </Typography>
          <Stack direction="row" style={{ paddingLeft: 5, paddingTop: 5 }}>
            <VisibilityIcon fontSize='medium'/>
            <Typography style={{ paddingRight: 5 }}>{count}</Typography >
            <Rating name="recipe-rating" value={averageRating} readOnly />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
