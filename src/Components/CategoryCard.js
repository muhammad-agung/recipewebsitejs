import React, { useEffect, useState } from 'react';
import { CardActionArea, Stack, Rating, Typography, CardMedia, CardContent, Card } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink } from 'react-router-dom';
import { firebase } from '../Firebase';

const ActionAreaCard = ({ category }) => {
  const [count, setCount] = useState(0); 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const card = document.getElementById(`category-card-${category.id}`);
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
  }, [category.id]);

  return (
    <Card
      id={`category-card-${category.id}`}
      style={{
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : '20px'})`, // Move card from bottom to top
      }}
    >
      <CardActionArea>
        <CardMedia style={{ height: 250, width: '100%' }} component="img" image={category.image} alt={category.image} />
        <CardContent style={{ minHeight: 30 }}>
        <Typography variant="h6" component="div" style={{ textAlign: 'center' }} sx={{ fontFamily: "Kaushan Script, cursive" }}>
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
