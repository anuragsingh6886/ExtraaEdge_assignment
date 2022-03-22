import './App.css';
import React from 'react';
import SignIn from './signin.js'
import Weather from './weather'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () =>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="weather" element={<Weather />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;