import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../config/api';
import RecipeCard from '../../Components/recipeCard/RecipeCard';
import "./Recipes.css";

function Recipes() {
  const [recipe, setRecipe] = useState([])
  const navigate = useNavigate(); 

  const handleNavigate = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/recipe/getRecipes`);
        setRecipe(response.data);
        console.log(recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
      <RecipeCard handleNavigate={handleNavigate} recipe={recipe}/>
    </div>
  );
}

export default Recipes;
