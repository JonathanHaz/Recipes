import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ recipe, handleNavigate }) {
  return (
    <div className="recipesDiv">
      {recipe.map((item) => (
        <div key={item._id} onClick={() => handleNavigate(item._id)} className="recipe-card">
          <div className="recipe-img-container">
            <div className="recipe-img-shadow"></div> {/* Shadow effect */}
            {item.imgURL && (
              <img src={item.imgURL} alt={item.name} className="recipe-img" />
            )}
          </div>
          <div className="recipe-card-content">
            <h1 className="recipe-name">{item.name}</h1>
            <div className="recipe-categories">
              {item.category.map((category, index) => (
                <div key={index} className={`category-label ${category.toLowerCase()}`}>
                  {category}
                </div>
              ))}
            </div>
            <hr className="horizontal-line" />
            <div className="recipe-cook-time">
              <span><i className="fa-regular fa-clock"></i> {item.cookTime} minutes</span>
              <div className="vertical-line"></div>
              <span>Created by {item.userId.username}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
