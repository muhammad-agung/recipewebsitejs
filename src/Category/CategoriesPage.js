import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { db } from '../Firebase';
import { Link } from 'react-router-dom'; // Import Link for navigation


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
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)' }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: 'center', margin: '20px' }} fontFamily={"Kaushan Script, cursive"}>
        Categories
      </Typography>
      <Grid container spacing={2} justifyContent="center" padding={2}>
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
  const { name, image } = category;

  return (
    <Card>
      <CardMedia component="img" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6" component="div" style={{ textAlign: 'center' }} sx={{ fontFamily: "Kaushan Script, cursive" }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoriesPage;
