import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Contact from './components/Contact/Contact';

axios.defaults.withCredentials = true;
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const userDetails = async () => {
    try{
      const response = await axios.post("https://task-backend-q4kt.onrender.com/userAuth");
      console.log(response.data);
      if(!response.data.authorized){
        setLoggedIn(false);
        console.log(response.data.authorized); // checking-working
      } else{
        handleLogin(response.data.username);
        console.log(response.data.authorized);// checking-working
      }
    } catch(error){
      console.log("user not logged in :", error);
    }
  }

  const handleLogin = (name) => {
    setLoggedIn(true);
    setUsername(name);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <ToastContainer theme="colored" position="top-center" />
      <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} />
      <Routes>
       <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/das" element={<Dashboard />} />


      </Routes>
    </Router>
  );
};

export default App;
