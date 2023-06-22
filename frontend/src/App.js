import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './login/LoginPage';
import Success from './login/Success';
import { useEffect, useState } from 'react';
import Profile from './views/Profile';

function App() {

  const [token, setToken] = useState('');

  useEffect(()=>
  {
    const fetchUser = async() =>
    {
      let response = await fetch('http://localhost:5000/', {
        method: "GET", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
      });
      
      response = await response.json();
      console.log(response);
      setToken(response?.token);
      console.log("We're In!", token); 
    }

    if (token === 'FETCHING...')
    {
      fetchUser();
    }
  })

  return (
    <>
    <Routes>
      <Route element = {token?.length > 0 && token !== "FETCHING..." ? <Profile token = {token}/> : <LoginPage />} index />
      <Route element = {<Success setToken = {setToken}/>} path = "/login-successful" /> 
    </Routes>
    </>
  );
}

export default App;
