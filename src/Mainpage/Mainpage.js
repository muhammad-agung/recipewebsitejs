import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipeList from './RecipeList';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Spinner from '../Components/FyingPan';
import {db} from '../Firebase'

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
        // Simulate 2 seconds loading delay
        setTimeout(() => setLoading(false), 2000);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  // Pagination logic
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
    <div style={{background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)'}}>
      <Header />
      <SearchBar handleSearch={handleSearch} />
      <RecipeList recipes={filteredRecipes} />
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length} // Use total number of all recipes
        paginate={paginate}
      />
      <Footer />
    </div>
  );
};

export default Mainpage;
