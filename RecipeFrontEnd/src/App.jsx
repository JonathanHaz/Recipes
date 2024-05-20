import React, { useContext, useEffect, useState } from "react";
import NavBar from "./Components/navBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Dashboard from "./Pages/dashboard/Dashboard";
import SearchPage from "./Pages/searchPage/SearchPage";
import ProfilePage from "./Pages/profilePage/ProfilePage";
import HomePage from "./Pages/home/HomePage";
import Auth from "./Pages/auth/Auth";
import "./App.css";
import Footer from "./Components/footer/Footer";
import CreateRecipe from "./Pages/createRecipe/CreateRecipe";
import CookBook from "./Pages/cookBook/CookBook";
import SingleRecipe from "./Pages/singleRecipe/SingleRecipe";
import Recipes from "./Pages/recipes/Recipes";
import SingleCookBook from "./Pages/singleCookBook/SingleCookBook";
import CreateCB from "./Pages/createCookBook/CreateCB";




function App() {
  const { user, setUser } = useContext(UserContext);

 
  return (
    <div>
      <BrowserRouter>

      <div>
           <NavBar/>
      </div>
      <div>
      {user ? (
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth" element={<HomePage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:recipeId" element={<SingleRecipe />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/recipes" element={<Recipes />} /> */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cookbooks" element={<CookBook />} />
            <Route path="/cookbooks/:cookBookId" element={<SingleCookBook />} />
            <Route path="/createR" element={<CreateRecipe />} />
            <Route path="/createCB" element={<CreateCB/>} />
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:recipeId" element={<SingleRecipe />} />
            <Route path="/cookbooks/:cookBookId" element={<SingleCookBook />} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/profile" element={<HomePage />} />
            <Route path="/createR" element={<CreateRecipe />} />
            <Route path="/cookbooks" element={<CookBook />} />
            <Route path="/createCB" element={<CreateCB/>} />

          </Routes>
        )}
      </div>
      <Footer />
   </BrowserRouter>


    </div>
  );
}

export default App;
