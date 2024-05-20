import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TextField, Button, InputAdornment, IconButton, Box } from '@mui/material'
import "./SearchPage.css"
import axios from 'axios'

import Sdisplay from '../../Components/searchPage/searchDisplay'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState({});
  const location = useLocation();
  const changeHandler = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    searchRecipes(query)
  }

  const searchRecipes = async (query) => {




    await axios.get(`http://localhost:3000/api/v1/recipe/getRecipes?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      }).catch((err) => {
        console.log(err, 'Error searching recipes :(');
      });
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryFromUrl = params.get('q');
    if (queryFromUrl) {
      console.log(queryFromUrl);
      setQuery(queryFromUrl);
      searchRecipes(queryFromUrl);
    }
  }, [location.search]);


  return (
    <Box width={'100%'} id='searchPageWrapper'>
      <form id='searchField' onSubmit={handleSubmit}>
        <TextField
          fullWidth
          onChange={changeHandler}
          id="standard-basic"
          label="Search for some recipes..."
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button
                  id="searchBtn"
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  Search
                </Button>
              </InputAdornment>
            )
          }}
        />
      </form>

      {Object.keys(data).length === 0 ? null : <Sdisplay data={data} />}

    </Box>
  );
}

export default SearchPage