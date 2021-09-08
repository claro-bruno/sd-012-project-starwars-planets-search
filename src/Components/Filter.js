import React, { useContext, useState } from 'react';
import PlanetsContext from '../Contexts/PlanetContext';

function Filter() {
  const {
    name,
    setName,
    setColumnsAvailable,
    setFiltered,
    data,
    filtersByNumeric,
    setFiltersByNumeric,
    columnsAvailable,
  } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior');
  const [value, setValue] = useState(0);

  const filterByName = ({ target }) => {
    setName(target.value);

    const filteredPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)
    ));

    setFiltered(filteredPlanets);
  };
  const handleChange = ({ target }) => {
    const { id } = target;

    if (id === 'column') {
      setColumn(target.value);
    } else if (id === 'comparison') {
      setComparison(target.value);
    } else {
      setValue(target.value);
    }
  };

  const resetFilters = () => {
    const columnValue = document.getElementById('column').value;
    setColumn(columnValue);
    setComparison('maior');
    setValue(0);
  };
  const saveFilters = () => {
    const newFilter = { column, comparison, value };
    setFiltersByNumeric(filtersByNumeric.concat(newFilter));
    resetFilters();
  };
  const updatePlanets = () => {
    const filteredPlanets = data.filter((planet) => {
      if (comparison === 'maior que') {
        return parseFloat(planet[column]) > parseFloat(value);
      }
      if (comparison === 'menor que') {
        return parseFloat(planet[column]) < parseFloat(value);
      }

      return parseFloat(planet[column]) === parseFloat(value);
    });

    setFiltered(filteredPlanets);
  };

  const filterByNumeric = () => {
    saveFilters();

    const newColumnArray = columnsAvailable.filter((columns) => columns !== column);
    updatePlanets();
    setColumnsAvailable(newColumnArray);
  };

  const deleteFilter = ({ target }) => {
    const { parentNode } = target;
    const { id } = parentNode;
    const numberID = parseFloat(id);

    const item = filtersByNumeric[numberID];
    setFiltersByNumeric(filtersByNumeric.filter((ai) => ai !== item));
    setColumnsAvailable(columnsAvailable.concat(item.column));
    setFiltered(data);
  };

  const renderFilters = () => {
    if (filtersByNumeric.length > 0) {
      return filtersByNumeric.map((filters, index) => (
        <div key={ index } id={ index } data-testid="filter">
          <span>
            {`${filters.column} | ${filters.comparison} | ${filters.value}`}
          </span>
          <button type="button" onClick={ deleteFilter }>X</button>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ filterByName }
      />
      <div>
        <select
          data-testid="column-filter"
          id="column"
          value={ column }
          onChange={ handleChange }
        >
          {columnsAvailable.map((columns, index) => (
            <option key={ index } value={ columns }>
              {columns}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          id="value"
          value={ value }
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterByNumeric }
        >
          Adicionar filtro
        </button>
      </div>
      {renderFilters()}
    </div>
  );
}

export default Filter;
