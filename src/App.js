import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import Mainpage from './Mainpage/Mainpage'
import RecipeDetail from './RecipeDetailpage/RecipeDetail'
import AboutPage from './AboutPage/AboutPage'

export default function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/about" element={<AboutPage />} />
          {/* 404 page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
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