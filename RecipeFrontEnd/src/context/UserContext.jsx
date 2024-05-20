import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { api } from "../config/api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${api}/user/getUser/db`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/user/register`, userData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/user/login`, userData);
      console.log('Log in successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
    } catch (error) {
      console.error('Log in failed:', error);
    }
  };

  const handleLogout = () =>{
    localStorage.removeItem('token')
  }

  useEffect(()=>{
    fetchUserData()
  },[])


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetch("http://localhost:3000/api/v1/users/init-user", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           throw new Error("Failed to fetch user data");
  //         }
  //       })
  //       .then((userData) => {
  //         setUser(userData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //         setUser(null);
  //       });
  //   } else {
  //     setUser(null);
  //   }
  // }, []);

  //   useEffect(() => {
  //     fetchUserData();
  // }, []);

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  const shared = {
    user,
    changeHandler,
    handleRegister,
    handleLogin,
    handleLogout,
    fetchUserData
  };

  return (
    <UserContext.Provider value={shared}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
