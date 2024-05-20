import React from 'react'

export default function ProfileRecipeCard({recipe, handleNavigate}) {
    console.log(recipe);
  return (
    <div>
      <h1>My Recipes</h1>
      {recipe.map((item)=>{
        return (
            <div key={item._id} onClick={() => handleNavigate(item._id)}>
                <img src={item.imgURL} alt="" />
                <h1>{item.name}</h1>
                <p>{item.cookTime}</p>
            </div>
        )
      })}
      
    </div>
  )
}
