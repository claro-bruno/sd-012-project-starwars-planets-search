import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function Provider({ children }) {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState('');
  const contextValue = {
    info,
    setInfo,
    filters: {
      filterByName: {
        name,
        setName,
      },
    },
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
