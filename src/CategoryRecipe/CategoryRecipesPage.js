import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import { db } from '../Firebase';
import RecipeList from '../Components/RecipeList';
import Pagination from '../Components/Pagination';
import Spinner from '../Components/FyingPan'

const CategoryRecipesPage = () => {
  const { category } = useParams();
  const [currentRecipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  let { state } = useLocation();
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipeData = [];
        const snapshot = await db.collection('users').where('category', 'array-contains', state.categoryId).get();
        snapshot.forEach(doc => {
          recipeData.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, state]);


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // Search functionality
  const handleSearch = term => {
    setSearchTerm(term);
    // Reset to first page when searching
    setCurrentPage(1);
  };


  // Filter recipes based on search term
  const filteredRecipes = currentRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Recalculate pagination based on filtered recipes
    const filteredIndexOfLastRecipe = currentPage * recipesPerPage;
    const filteredIndexOfFirstRecipe = filteredIndexOfLastRecipe - recipesPerPage;
    const filteredCurrentRecipes = filteredRecipes.slice(
      filteredIndexOfFirstRecipe,
      filteredIndexOfLastRecipe
    );

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',paddingTop:10 }}>
      <SearchBar handleSearch={handleSearch} pageTitle={`Recipes for ${state.categoryId}`} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <RecipeList recipes={filteredCurrentRecipes} />
          {/* Pagination component */}
          <Pagination
            recipesPerPage={recipesPerPage}
            totalRecipes={filteredRecipes.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default CategoryRecipesPage;
