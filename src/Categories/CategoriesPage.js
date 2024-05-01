import React, { useState, useEffect } from 'react';
import {Typography, Grid } from '@mui/material';
import { db } from '../Firebase';
import { Link } from 'react-router-dom';
import CategoryCard from '../Components/CategoryCard'
import Spinner from '../Components/FyingPan'


const CategoriesPage = () => {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const recipeData = [];
        const snapshot = await db.collection('recipeCategories').get();
        snapshot.forEach(doc => {
          recipeData.push({ id: doc.id, ...doc.data() });
        });
        setCategory(recipeData);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)', padding:40 }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: 'center'}} fontFamily={"Kaushan Script, cursive"}>
        Categories
      </Typography>
      <Grid container spacing={4} justifyContent="center" padding={1}>
        {loading ? (
          <Spinner />
        ):(
          categories.map((category) => (
            <Grid item key={category.id} xs={16} sm={10} md={2}>
              {/* Wrap the CategoryCard with Link */}
              <Link to={`/category/${category.id}`}  state={{ categoryId: category.name }} style={{ textDecoration: 'none' }}>
                <CategoryCard category={category} />
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default CategoriesPage;
