import React from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Box from '@mui/material/Box';

const RecipeDetail = () => {
  const location = useLocation();
  const currentRecipe = location.state && location.state.currentRecipe;

    // Determine the width percentage based on the display width
    const widthPercentage = window.innerWidth > 1000 ? '70%' : '100%';

  if (!currentRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#FFCCBC', paddingBottom: '45px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1%',
        }}
      >
        <h1>{currentRecipe.title}</h1>
        <p>{currentRecipe.shortDesc}</p>
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
