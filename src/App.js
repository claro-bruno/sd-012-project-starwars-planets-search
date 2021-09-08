import React from 'react';
import { StarWarsProvider } from './context/StarWarsContext';

import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
