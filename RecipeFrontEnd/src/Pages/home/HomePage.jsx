
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import FadeInSection from "../../context/FadeInContext";
import RecipesIdeasCard from "../../Components/recipesIdeasCard/RecipesIdeasCard";

function HomePage() {

  const redirect = (name) => {
    window.location.replace(`http://localhost:5173/search?q=${name}`)
  }

  return (
    <div>
      <div className="homePageContainer">
        <div className="blueShapeDiv">
          <img className="blueShape" src="src/assets/images/shapeBlue.png" alt="blue shape" />
          <img className="vegtables" src="src/assets/images/vegtables.png" alt="vegetables" />
        </div>
        <div className="containerForPlate">
          <div className="plateOfFoodDiv">
            <img className="plateOfFood" src="src/assets/images/plateOfFood.png" alt="plate of food" />
          </div>
          <div>
            <h1 className="titleOfHome">Best Recipes</h1>
            <p className="textUnderTitleHome">
              Welcome to our recipes website, where culinary inspiration meets
              home-cooked delight, offering a diverse array of mouthwatering
              dishes for every palate and occasion.
            </p>
            <button className="buttonExplore">Explore</button>
          </div>
        </div>

      </div>
      <FadeInSection>
        <div className="homePageSecondPart">

          <div className="recipeTitleDiv">
            <h1 className="recipesIdeasTitle">Recipes Ideas</h1>
          </div  >
          <div className="recipesIdeasCardDiv">
            <RecipesIdeasCard onclick={() => redirect('Breakfast')} name="Breakfast" src="src/assets/images/breakfast.png" />   <RecipesIdeasCard name="Fries" src="src/assets/images/frenchFries.png" />
            <RecipesIdeasCard onclick={() => redirect('Pasta')} name="Pasta" src="src/assets/images/pasta.png" />
            <RecipesIdeasCard onclick={() => redirect('Meat')} name="Meat" src="src/assets/images/steak.png" />
            <RecipesIdeasCard onclick={() => redirect('Chicken')} name="Chicken" src="src/assets/images/chicken.png" />
            <RecipesIdeasCard onclick={() => redirect('Pizza')} name="Pizza" src="src/assets/images/pizza.png" />
            <RecipesIdeasCard onclick={() => redirect('Dessert')} name="Dessert" src="src/assets/images/dessert.png" />
          </div>
          <FadeInSection>
          <div >
            <img className="imageForAbout" src="src\assets\images\about.png" alt="" />
            <img className="secondImageForAbout" src="src\assets\images\About us.png" alt="" />
          </div>
          </FadeInSection>
        </div>
      </FadeInSection>
    </div>
  );
}

export default HomePage;


