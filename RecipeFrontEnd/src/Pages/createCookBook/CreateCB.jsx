import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { api } from '../../config/api';

export default function CreateCB() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      axios.get(`${api}/recipe/getRecipesByUser/${userId}`)
        .then(response => setAllRecipes(response.data))
        .catch(error => console.error('Error fetching recipes:', error));
    }
  }, [userId]);

  const handleCreateCookbook = async (e) => {
    e.preventDefault();
    try {
      const newCookbook = {
        name,
        price,
        recipes
      };
      console.log('recipes' , recipes);
      const response = await axios.post(
        `${api}/cookbook/createCookBook`,
        newCookbook,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Cookbook created:', response.data);
    } catch (error) {
      console.error('Error creating cookbook:', error);
    }
  };

  const handleRecipeSelect = (recipe) => {
    if (recipes.some(item => item._id === recipe._id)) {
      setRecipes(recipes.filter(item => item._id !== recipe._id));
    } else {
      setRecipes([...recipes, recipe]);
    }
  };

  return (
    <div>
      <h2>Create a Cookbook</h2>
      <form onSubmit={handleCreateCookbook}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Recipes:
          <ul>
            {allRecipes.map(recipe => (
              <li key={recipe._id}>
                <input
                  type="checkbox"
                  checked={recipes.some(item => item._id === recipe._id)}
                  onChange={() => handleRecipeSelect(recipe)}
                />
                {recipe.name}
              </li>
            ))}
          </ul>
        </label>
        <br />
        <button type="submit">Create Cookbook</button>
      </form>
    </div>
  );
}
