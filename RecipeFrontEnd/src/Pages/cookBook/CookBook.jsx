import React,{useState,useEffect} from 'react'
import { api } from '../../config/api'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CookBook.css'
import CookBookCard from '../../Components/CookbookCard/CookBookCard';

export default function CookBook() {
  const [cookbook, setCookBook] = useState([])  
  const navigate = useNavigate(); 

  const handleNavigate = (cookBookId) => {
    navigate(`/cookbooks/${cookBookId}`);
  };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${api}/cookbook/getCookbooks`);
            console.log(response.data);
            setCookBook(response.data);
          } catch (error) {
            console.error("Error fetching recipe:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>
      <CookBookCard handleNavigate={handleNavigate} cookbook={cookbook}/>
    </div>
  )
}
