import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import Create from './components/Create';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Nav from './components/Nav';

function App() {
  
  return (
    <BrowserRouter>
    {/* <Nav/> */}
      <Routes>
          <Route exact path='/' element={<LandingPage />} />
          {/* <Route path='/' element={<Nav/>}/> */}
          
            
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/create' element={<Create />}/>
            <Route path='/Details/:id' element={<Details />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;

