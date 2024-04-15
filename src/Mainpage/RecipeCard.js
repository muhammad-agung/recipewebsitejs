import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


export default function ActionAreaCard({ recipe }) {
  
  return (
    <Card sx={{ width: 400, boxShadow: 3 }}>
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`}  state={{ currentRecipe: recipe }}>
        <CardMedia
          component="img"
          height="400"
          image= {recipe.thumbnail}
          alt="Recipe"
        />
        <CardContent sx={{ minHeight: 100, backgroundColor: "#FBE9E7" }}>
          <Typography gutterBottom variant="h5" component="div" display="flex"  justifyContent="center" alignItems="center" fontFamily={"'Kalam', cursive"}>
            {recipe.title}
          </Typography>
          <Typography variant="body1" color="text.primary" fontFamily={"'Kalam', cursive"}>
          {recipe.shortDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}