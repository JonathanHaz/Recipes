import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../config/api';
import './ProfilePage.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfileRecipeCard from '../../Components/ProfileRecipe/ProfileRecipeCard';
import ProfileCookBookCard from '../../Components/ProfileCookBook/ProfileCookBookCard';

function ProfilePage() {
  const { user , fetchUserData } = useContext(UserContext);
  const [recipe, setRecipe] = useState([]);
  const [cookbook, setCookbook] = useState([])
  const [ImgData, setImgData] = useState({});
  const navigate = useNavigate();

  const userId = user._id;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${api}/recipe/getRecipesByUser/${userId}`);
        console.log(response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, []);

  useEffect(() => {
    const fetchCookBook = async () => {
      try {
        const response = await axios.get(`${api}/cookbook/getCookBookByUser/${userId}`);
        console.log(response.data);
        setCookbook(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchCookBook();
  }, []);

  const handleNavigate = (recipeId) => {
    navigate(`/recipes/${recipeId}`); 
  };

  const handleNavigateCook = (cookBookId) =>{
    navigate(`/cookbooks/${cookBookId}`)
  }



  const changeImgInfoHandler = (e) => {
    setImgData(e.target.files[0]);

  };

  const handleFile = () => {
    const formData = new FormData();
    formData.append("profileIMG", ImgData);
    axios.post(`${api}/user/image/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFile();
  };

  return (
    <div>
      <img id='profileIMG' src={user.imageUrl} alt="" />
      <h1>{user.username}</h1>
      <h2>{user.email}</h2>
      <div>
        <form onSubmit={handleSubmit}> 
        <input
                type="file"
                onChange={changeImgInfoHandler}
              />
        <button>Upload Image</button>
        </form>
        <div>
        <ProfileRecipeCard handleNavigate={handleNavigate} recipe={recipe}/>
        <ProfileCookBookCard handleNavigateCook={handleNavigateCook} cookbook={cookbook}/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
