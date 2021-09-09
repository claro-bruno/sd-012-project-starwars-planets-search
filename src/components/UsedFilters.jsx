import React, { useContext } from 'react';
import Context from '../context';

function UsedFilters() {
  const {
    filters,
    setFilters,
  } = useContext(Context);

  const { filterByNumericValues } = filters;

  const removeFilter = (index) => {
    console.log(filterByNumericValues);
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((_filter, i) => (
        i !== index
      )),
    });
  };

  return (
    <div>
      {
        filterByNumericValues.map(({ column, comparison, value }, i) => (
          <div key={ column } data-testid="filter">
            <span>{ column }</span>
            <span>{ comparison }</span>
            <span>{ value }</span>
            <button
              type="button"
              onClick={ () => removeFilter(i) }
            >
              X
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default UsedFilters;
