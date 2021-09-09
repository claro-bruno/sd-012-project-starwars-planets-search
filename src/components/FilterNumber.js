import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

export default function FilterNumber() {
  const {
    filters: { filterByNumericValues },
    setFilters,
  } = useContext(Context);

  const tableColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparisons = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const [columnList, setColumnList] = useState(tableColumns);

  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '10000',
  });

  const handleChange = ({ target }) => {
    setNumericFilter((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleFilterByNumericValues = ({ column, comparison, value }) => {
    setFilters((prevFilters) => {
      if (!filterByNumericValues[0].value) {
        return {
          ...prevFilters,
          filterByNumericValues: [
            {
              column,
              comparison,
              value,
            },
          ],
        };
      }
      return {
        ...prevFilters,
        filterByNumericValues: [
          ...filterByNumericValues,
          { column, comparison, value },
        ],
      };
    });
  };

  useEffect(() => {
    const newColumn = tableColumns.filter((column) => !filterByNumericValues
      .some((filter) => filter.column === column))
      .map((nextColumn) => nextColumn);

    setNumericFilter((prevState) => ({
      ...prevState,
      column: newColumn[0],
    }));
    setColumnList(newColumn);
  }, [filterByNumericValues]);

  return (
    <div className="filter-number">
      <select
        name="column"
        onChange={ (e) => handleChange(e) }
        data-testid="column-filter"
      >
        {columnList.map((column) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>

      <select
        name="comparison"
        onChange={ (e) => handleChange(e) }
        data-testid="comparison-filter"
      >
        {comparisons.map((column) => (
          <option key={ column }>
            {column}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="value"
        onChange={ (e) => handleChange(e) }
        data-testid="value-filter"
      />

      <button
        type="button"
        onClick={ () => handleFilterByNumericValues(numericFilter) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}
