import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    const filteredResults = await fetchAPI();
    filteredResults.forEach((planet) => delete planet.residents);
    setPlanets(filteredResults);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const context = {
    planets,
    setPlanets,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
