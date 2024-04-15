import React, { useState, useEffect } from 'react';
import Header from './Header';
import RecipeList from './RecipeList';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Spinner from './FyingPan';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

// Initialize Firebase (Make sure to replace these values with your Firebase project configuration)
const firebaseConfig = {
  apiKey: "AIzaSyB6fdL5k0xRPmoJgW83uEqW-PinL8irIYY",
  authDomain: "recipe-server-f97e9.firebaseapp.com",
  databaseURL: "https://recipe-server-f97e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "recipe-server-f97e9",
  storageBucket: "recipe-server-f97e9.appspot.com",
  messagingSenderId: "180254957444",
  appId: "1:180254957444:web:0005ba5c96b6f43f4487d1",
  measurementId: "G-6LH3MWM22X"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const Mainpage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(8);
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
    <div style={{backgroundColor: '#FFCCBC'}}>
      <script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </script>
      <Header />
      <SearchBar handleSearch={handleSearch} />
      <RecipeList recipes={filteredRecipes} />
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length} // Use total number of all recipes
        paginate={paginate}
      />
    </div>
  );
};

export default Mainpage;
