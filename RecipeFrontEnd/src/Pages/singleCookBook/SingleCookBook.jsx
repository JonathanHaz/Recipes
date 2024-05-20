import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../config/api';
import SingleCookBookCard from '../../Components/singleCookBookCard/SingleCookBookCard';

export default function SingleCookBook() {
    const [cookbook, setCookbook] = useState([]);
     const { cookBookId } = useParams();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${api}/cookbook/getCookbook/${cookBookId}`
            );
            setCookbook(response.data);
          } catch (error) {
            console.error("Error fetching recipe:", error);
          }
        };
    
        fetchData();
      }, [cookBookId]);
    
  return (
    <div>
      <SingleCookBookCard cookbook={cookbook}/>
    </div>
  )
}
