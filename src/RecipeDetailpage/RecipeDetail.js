import React from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';    
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw } from 'draft-js';
import Box from '@mui/material/Box';

const RecipeDetail = () => {
  const location = useLocation();
  const currentRecipe = location.state && location.state.currentRecipe;

  if (!currentRecipe) {
    return <div>Recipe not found</div>;
  }

  const contentState = convertFromRaw(JSON.parse(currentRecipe.content));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div style={{ width: '100%', backgroundColor: '#FFCCBC', paddingTop: '1%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{currentRecipe.title}</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>{currentRecipe.shortDesc}</p>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Editor
          wrapperStyle={{ width: '90%', maxWidth: '800px', backgroundColor: 'white' }}
          editorState={editorState}
          readOnly
          toolbarHidden
          autoHeight
        />
      </Box>
    </div>
  );
};

export default RecipeDetail;
