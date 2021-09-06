import React from 'react';
import './App.css';
import Planets from './pages/Planets';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Planets />
    </Provider>
  );
}

export default App;
