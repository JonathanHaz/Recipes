// RecipesIdeasCard.js
import React from 'react';
import "./RecipesIdeasCard.css";

function RecipesIdeasCard({ name, src , onclick}) {

  const handleClick = () => {
    if (onclick) {
      onclick(name);
    }
  };
  
  return (
    <div className='recipeIdeasCardContainer'  onClick={handleClick}>
      <div className='imageContainer'>
        <img className='imageIdeas' src={src} alt="" />
        <h1 className='nameOfRecipeIdea'>{name}</h1>
      </div>
    </div>
  );
}

export default RecipesIdeasCard;
