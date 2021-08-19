import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function ActiveFiltersList() {
  const { filters, setFilters } = useContext(AppContext);
  const { filterByNumericValues } = filters;

  const deleteFilter = (index) => {
    filterByNumericValues.splice(index, 1);
    setFilters({
      ...filters,
      filterByNumericValues,
    });
  };

  return (
    <ul>
      {
        filterByNumericValues.map((filter, index) => (
          <li data-testid="filter" key={ index }>
            {`${filter.column} ${filter.comparison} ${filter.value} `}
            <button
              type="button"
              onClick={ () => deleteFilter(index) }
            >
              X
            </button>
          </li>
        ))
      }
    </ul>
  );
}

export default ActiveFiltersList;