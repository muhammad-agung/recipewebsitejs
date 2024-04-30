import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Fade } from '@mui/material';
import { db } from '../Firebase';
import { Link } from 'react-router-dom';


const CategoriesPage = () => {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const recipeData = [];
        const snapshot = await db.collection('recipeCategories').get();
        snapshot.forEach(doc => {
          recipeData.push({ id: doc.id, ...doc.data() });
        });
        setCategory(recipeData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)', paddingTop:10 }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: 'center', margin: '20px' }} fontFamily={"Kaushan Script, cursive"}>
        Categories
      </Typography>
      <Grid container spacing={4} justifyContent="center" padding={1}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={3}>
            {/* Wrap the CategoryCard with Link */}
            <Link to={`/category/${category.id}`}  state={{ categoryId: category.name }} style={{ textDecoration: 'none' }}>
              <CategoryCard category={category} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const CategoryCard = ({ category }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottomScrollPosition = window.innerHeight + window.scrollY;
      const cardPosition = document.getElementById(category.id).offsetTop;
      if (bottomScrollPosition > cardPosition && !visible) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on component mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [category.id, visible]);

  return (
    <Fade in={visible}>
      <Card id={category.id} style={{ transition: 'opacity 0.5s ease-in-out' }}>
        <CardMedia component="img" image={category.image} alt={category.name} />
        <CardContent>
          <Typography variant="h6" component="div" style={{ textAlign: 'center' }} sx={{ fontFamily: "Kaushan Script, cursive" }}>
            {category.name}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default CategoriesPage;
