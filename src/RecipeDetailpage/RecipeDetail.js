import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Box, Typography, Rating, Button } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const RecipeDetail = () => {
  const location = useLocation();
  const currentRecipe = location.state && location.state.currentRecipe;

  const [selectedRating, setSelectedRating] = useState(null); // Initialize selectedRating as null
  const [rated, setRated] = useState(false); // Initialize rated state as false
  const [averageRating, setAverageRating] = useState(0); // Initialize averageRating as 0

  // Determine the width percentage based on the display width
  const widthPercentage = window.innerWidth > 1000 ? '70%' : '100%';

  // Function to calculate average rating
  const calculateAverageRating = async () => {
    try {
      // Create a reference to the rating document for the specific recipe
      const ratingRef = firebase.firestore().collection('recipeRatings').doc(currentRecipe.id);

      // Fetch the rating document
      const snapshot = await ratingRef.get();

      // If the document exists, calculate the average rating
      if (snapshot.exists) {
        const data = snapshot.data();
        const totalRatings = Object.values(data).reduce((acc, curr) => acc + curr, 0);
        const totalStars = Object.keys(data).reduce((acc, curr) => acc + parseInt(curr) * data[curr], 0);
        const averageRating = totalStars / totalRatings;

        return averageRating;
      }

      return 0; // Return 0 if no ratings exist yet
    } catch (error) {
      console.error('Error calculating average rating:', error);
      return 0; // Return 0 in case of error
    }
  };

  useEffect(() => {
    const clearSessionStorage = () => {
      sessionStorage.removeItem('counterIncremented');
    };
  
    const fetchData = async () => {
      window.addEventListener('beforeunload', clearSessionStorage);
  
      if (currentRecipe) {
        const viewedFlag = sessionStorage.getItem(`viewed_${currentRecipe.id}`);
        if (!viewedFlag) {
          incrementCounter(currentRecipe.id);
          sessionStorage.setItem(`viewed_${currentRecipe.id}`, 'true');
        }
      }
  
      try {
        const rating = await calculateAverageRating();
        setAverageRating(rating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
        // Optionally, handle the error or set a default value for averageRating
      }
    };
  
    fetchData();
  
    return () => {
      window.removeEventListener('beforeunload', clearSessionStorage);
    };
  }, [currentRecipe]);
  
  

  const incrementCounter = async (recipeId) => {
    try {
      // Create a reference to the counter document for the specific recipe
      const counterRef = firebase.firestore().collection('recipeCounters').doc(recipeId);
  
      // Use set with merge option to increment the counter by 1 or create the document if it doesn't exist
      await counterRef.set({ count: firebase.firestore.FieldValue.increment(1) }, { merge: true });
    } catch (error) {
      console.error('Error incrementing counter:', error);
    }
  };
  
  const handleRate = async () => {
    // Check if the user has already rated the recipe
    if (localStorage.getItem(`rated_${currentRecipe.id}`)) {
      alert('You have already rated this recipe.');
      return;
    }
  
    try {
      // Increment the counter for the selected rating in the database
      const ratingRef = firebase.firestore().collection('recipeRatings').doc(currentRecipe.id);
      await ratingRef.set({
        [selectedRating]: firebase.firestore.FieldValue.increment(1)
      }, { merge: true });
  
      // Store a flag in client-side storage to indicate that the user has rated the recipe
      localStorage.setItem(`rated_${currentRecipe.id}`, 'true');
      setRated(true);
  
      alert('Thank you for rating this recipe!');
    } catch (error) {
      console.error('Error rating recipe:', error);
      alert('An error occurred while rating the recipe. Please try again later.');
    }
  };

  const handleRatingChange = (event, newValue) => {
    setSelectedRating(newValue);
  };

  return (
    <div style={{ width: '100%', background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1%',
        }}
      >
        <Typography variant="h3" fontFamily="'Kalam', cursive" style={{ paddingBottom: 20 }}>{currentRecipe.title}</Typography>
        <Typography variant="h5" fontFamily="'Kalam', cursive" style={{ paddingBottom: 20 }}>{currentRecipe.shortDesc}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Rate this recipe:
          </Typography>
          <Rating
            name="recipe-rating"
            value={selectedRating}
            onChange={handleRatingChange}
            size="large"
            style={{ color: rated ? 'primary' : 'disabled' }}
          />
          <Button onClick={handleRate} disabled={!selectedRating}>
            {rated ? 'Rated' : 'Rate'}
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ paddingTop: 2 }}>
          Average Rating: {averageRating ? averageRating.toFixed(1) : 'Loading...'}
        </Typography>
        <Editor
          apiKey= {process.env.REACT_APP_FIREBASE_TINYMCE_ID}// Replace with your TinyMCE API key
          init={{
            menubar: false,
            statusbar: false,
            toolbar: false,
            width: widthPercentage,
            height: 800,
          }}
          initialValue={currentRecipe.content} // Pass the content as initialValue
          disabled
        />
      </Box>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
