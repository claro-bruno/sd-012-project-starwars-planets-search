import React from 'react';
import './App.css';
import Provider from './context/Provider.js';

import Table from './components/Table/index';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
