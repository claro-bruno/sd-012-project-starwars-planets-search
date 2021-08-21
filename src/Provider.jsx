import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './context/context';

export default function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const starwarsApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await starwarsApi.json();
      const { results } = json;
      results.forEach((planets) => delete planets.residents);
      setData(results);
    };
    fetchApi();
  }, []);

  const context = {
    data,
  };

  return (
    <StarwarsContext.Provider value={ context }>
      { children }
    </StarwarsContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };