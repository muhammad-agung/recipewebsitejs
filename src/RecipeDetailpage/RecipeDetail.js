import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Rating, Button, IconButton } from '@mui/material';
import { Share } from '@mui/icons-material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Editor } from '@tinymce/tinymce-react';
import FryingPan from '../Components/FyingPan'


const RecipeDetail = () => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [rated, setRated] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [loadingEditor, setLoadingEditor] = useState(true);


  // Determine the width percentage based on the display width
  const widthPercentage = window.innerWidth > 1000 ? '70%' : '100%';


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeDoc = await firebase.firestore().collection('users').doc(id).get();
        if (recipeDoc.exists) {
          setCurrentRecipe({ id: recipeDoc.id, ...recipeDoc.data() });
        } else {
          console.log('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
  
    fetchRecipe();
  }, [id]);
  
  useEffect(() => {
    const calculateAverageRating = async () => {
      try {
        if (!currentRecipe) {
          return 0;
        }
  
        const ratingRef = firebase.firestore().collection('recipeRatings').doc(currentRecipe.id);
        const snapshot = await ratingRef.get();
  
        if (snapshot.exists) {
          const data = snapshot.data();
          const totalRatings = Object.values(data).reduce((acc, curr) => acc + curr, 0);
          const totalStars = Object.keys(data).reduce((acc, curr) => acc + parseInt(curr) * data[curr], 0);
          const averageRating = totalStars / totalRatings;
  
          return averageRating;
        }
  
        return 0;
      } catch (error) {
        console.error('Error calculating average rating:', error);
        return 0;
      }
    };

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
      }
    };
  
    fetchData();
  
    return () => {
      window.removeEventListener('beforeunload', clearSessionStorage);
    };
  }, [currentRecipe]); // Include currentRecipe in the dependency array
  
  
  useEffect(() => {
    const editorLoadingTimeout = setTimeout(() => {
      setLoadingEditor(false);
    }, 2000);
    return () => clearTimeout(editorLoadingTimeout);
  }, []);
  

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


  const handleShare = () => {
    const recipeLink = `mamakusrecipe.com/recipe/${currentRecipe.id}`;

    // Create a temporary textarea element to copy the link to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = recipeLink;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Share link copied!');
  };
  
  return (
    <div style={{ width: '100%', background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)' }}>
      <Header />
      {currentRecipe && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1%',
          }}
        >
          <Typography variant="h3" fontFamily={"Kaushan Script, cursive"} style={{ paddingBottom: 20 }}>{currentRecipe.title}</Typography>
          <Typography variant="h5" style={{ paddingBottom: 20 }}>{currentRecipe.shortDesc}</Typography>
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
            Rating: {averageRating ? averageRating.toFixed(1) : 'No rating yet'}
          </Typography>
          <IconButton onClick={handleShare} style={{ marginTop: '10px' }}>
            Share<Share />
          </IconButton>
          {loadingEditor ? (
            <FryingPan />
          ) : (
            <Editor
              apiKey={process.env.REACT_APP_FIREBASE_TINYMCE_ID}
              init={{
                menubar: false,
                statusbar: false,
                toolbar: false,
                width: widthPercentage,
                height: 800,
              }}
              initialValue={currentRecipe.content}
              disabled
            />
          )}
        </Box>
      )}
      <Footer />
    </div>
  );
};

export default RecipeDetail;
