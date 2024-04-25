import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import RecipeCard from './RecipeCard'; // Import your RecipeCard component
import SearchBar from './SearchBar';
import { db } from '../Firebase';


const CategoryRecipesPage = () => {
  const { category } = useParams(); // Get categoryId from URL parameter
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12); // Adjust the number of recipes per page as needed
  let { state } = useLocation();
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeData = [];
        const snapshot = await db.collection('users').where('category', 'array-contains', state.categoryId).get();
        snapshot.forEach(doc => {
          recipeData.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [category, state]); // Fetch recipes when categoryId changes

  // Pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)' }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: 'center', margin: '20px' }} fontFamily={"Kaushan Script, cursive"}>
        Recipes for {state.categoryId}
      </Typography>
      {/* Search bar component */}
      <SearchBar handleSearch={handleSearch} />
      <Grid container spacing={2} justifyContent="center" padding={2}>
        {currentRecipes
          .filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(recipe => (
            <Grid item key={recipe.id} xs={16} sm={8} md={4}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
      </Grid>
      {/* Pagination component */}
      <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};

const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ textAlign: 'center', margin: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {pageNumbers.map(number => (
          <li key={number} style={{ display: 'inline', margin: '5px' }}>
            <button onClick={() => paginate(number)} style={{ cursor: 'pointer', backgroundColor: currentPage === number ? '#fcb69f' : 'white', border: '1px solid #fcb69f', padding: '5px 10px' }}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryRecipesPage;
