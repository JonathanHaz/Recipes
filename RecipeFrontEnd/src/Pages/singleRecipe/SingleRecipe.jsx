import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import "./SingleRecipe.css";
import SingleRecipeCard from "../../Components/singleRecipeCard/SingleRecipeCard";

function SingleRecipe() {
  const [recipe, setRecipe] = useState([]);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/recipe/getRecipe/${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchData();
  }, [recipeId]);

  return (
    <div>
      <SingleRecipeCard recipe={recipe}/>
    </div>
  );
}

export default SingleRecipe;
