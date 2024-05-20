import React, { useState } from 'react';
import './SingleCookBookCard.css'
export default function SingleCookBookCard({ cookbook }) {
  const [slide, setSlide] = useState(0)
  const [pag, setPag] = useState(1)

  const handleNext = () => {
    if (slide + 1 < cookbook.recipes.length) {
      setSlide(prevSlide => prevSlide + 1);
      setPag(prevPag => prevPag + 1)
    }
  };

  const handleBack = () => {
    if (slide - 1 >= 0) {
      setSlide(prevSlide => prevSlide - 1);
      setPag(prevPag => prevPag - 1)

    }
  };
  
  

  if (!cookbook) {
    return <div>No cookbook data available.</div>;
  }

  if (!cookbook.recipes) {
    return <div>No recipes available for this cookbook.</div>;
  }
  const singleRecipe = cookbook.recipes[slide].recipeId
  console.log(singleRecipe);
  console.log(cookbook);
  console.log(singleRecipe.ingridients);

  return (
    <div className='cookbookContainer'> 
      <img className='cookbookIMG' src={cookbook.imgURL} alt="" />
      <div>
          <div className='recipesContainer'>
            <div>
               <img src={singleRecipe.imgURL} alt="" />
            <h1>{singleRecipe.name}</h1>
            </div>
           <h1>Ingredients</h1>
            {singleRecipe.ingridients.map((item)=>{
              return(
                <div className='ingredients' key={item._id}>
                  <p>{item.quantity} {item.measurement} {item.name}</p>
                  </div>
              )
            })}
            <h1>Instructions</h1>
            {singleRecipe.instructions.map((item)=>{
              return(
                <div key={item._id}>
                  <p>{item.step}</p>
                  <p>{item.instruction}</p>
                </div>
              )
            })}
            <div className='btns'>
                   <button onClick={handleBack}>Back</button>
                   <p>{pag}</p>
            <button onClick={handleNext}>Next</button>
            </div>
          </div>
      </div>
      
    </div>
  );
}
