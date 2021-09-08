import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import fetchAPI from '../services/StarWarsAPI';

function PlanetsProvider({ children }) {
  const initialFilteres = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [filters, setFilters] = useState(initialFilteres);

  async function fetchData() {
    const { results } = await fetchAPI();
    setData({ dataFromAPI: results, dataFiltered: results });
    setIsFetching(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData((d) => {
      if (d !== undefined) {
        const dataFiltered = d.dataFromAPI
          .filter((element) => element.name.toLowerCase()
            .includes(filters.filterByName.name.toLowerCase()));
        return { ...d, dataFiltered };
      }
    });
  }, [filters.filterByName.name]);

  useEffect(() => {
    setData((d) => {
      let dataFiltered = [];
      if (d !== undefined) {
        filters.filterByNumericValues.map((filtro) => {
          const { column, comparison, value } = filtro;
          dataFiltered = d.dataFiltered.filter((element) => {
            if (comparison === 'maior que') {
              return Number(element[column]) > value;
            }
            if (comparison === 'menor que') {
              return Number(element[column]) < value;
            }
            return Number(element[column]) === Number(value);
          });

          return true;
        });
      }
      return { ...d, dataFiltered };
    });
  }, [filters.filterByNumericValues]);

  return (
    <Context.Provider
      value={
        { data, isFetching, setData, setIsFetching, filters, setFilters }
      }
    >
      {children}
    </Context.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
