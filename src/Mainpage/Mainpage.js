import React, { useState, useEffect } from 'react';
import RecipeList from '../Components/RecipeList';
import Pagination from '../Components/Pagination';
import SearchBar from '../Components/SearchBar';
import Spinner from '../Components/FyingPan';
import { db } from '../Firebase';

const Mainpage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch recipes from Firebase Firestore
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeData = [];
        const snapshot = await db.collection('users').get();
        snapshot.forEach(doc => {
          recipeData.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    const timeoutId = setTimeout(() => fetchRecipes(), 2000);

    // Cleanup function to cancel the setTimeout when the component unmounts or the effect re-executes
    return () => clearTimeout(timeoutId);
  }, []);


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Search functionality
  const handleSearch = term => {
    setSearchTerm(term);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
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
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)', paddingTop: 10 }}>
      <SearchBar handleSearch={handleSearch} pageTitle={"Latest and greatest"} />
      <RecipeList recipes={filteredCurrentRecipes} />
      {loading ? (
        <Spinner />
      ) : (
        <>
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

export default Mainpage;
