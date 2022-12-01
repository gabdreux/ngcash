import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import { useState } from 'react';
import { useEffect } from 'react';





// import { CorpoTeste } from './components/corpoTeste';
import axios from 'axios';







const App: React.FC = () => {
  return (
    <Home />
    // <CorpoTeste color="blue">Passado pelo children</CorpoTeste>

  )
};





export default App;
