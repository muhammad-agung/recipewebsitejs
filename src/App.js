import { Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage/Mainpage'
import RecipeDetail from './RecipeDetailpage/RecipeDetail'
import AboutPage from './AboutPage/AboutPage'
import CategoriesPage from './Category/CategoriesPage'
import CategoryRecipesPage from './Category/CategoryRecipesPage'
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<CategoryRecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/about" element={<AboutPage />} />
          {/* 404 page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      <Footer />
    </>
  );
 }
 
function Error404() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>
      <a href="/">Take me back!</a>
    </div>
  );
 }