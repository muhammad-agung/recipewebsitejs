import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import { db } from '../Firebase';
import RecipeList from '../Components/RecipeList';
import Pagination from '../Components/Pagination';


const CategoryRecipesPage = () => {
  const { category } = useParams();
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
  }, [category, state]);

  // Pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // Search functionality
  const handleSearch = term => setSearchTerm(term);

    // Filter recipes based on search term
    const filteredRecipes = currentRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',paddingTop:10 }}>
      <SearchBar handleSearch={handleSearch} pageTitle={"Recipes for " +state.categoryId}/>
      <RecipeList recipes={filteredRecipes} />
      {/* Pagination component */}
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
      />
      {/* <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} currentPage={currentPage} /> */}
    </div>
  );
};

export default CategoryRecipesPage;
