import React from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Box, Typography } from '@mui/material';

const RecipeDetail = () => {
  const location = useLocation();
  const currentRecipe = location.state && location.state.currentRecipe;

  // Determine the width percentage based on the display width
  const widthPercentage = window.innerWidth > 1000 ? '70%' : '100%';

  if (!currentRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{ width: '100%', background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)' }}>
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
        <Editor
          apiKey="cnra8bfoc01172abmclve5xtbay0i4b7q9lb7hq5qj977oem" // Replace with your TinyMCE API key
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
    </div>
  );
};

export default RecipeDetail;
