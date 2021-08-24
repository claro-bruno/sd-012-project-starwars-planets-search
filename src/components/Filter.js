import React, { useContext } from 'react';
import context from '../context/context';

const FilterInputs = () => {
  const { data, filters, setFilters, setDataToUse } = useContext(context);

  const {
    filterByName: { name },
    filterByNumericValues: { column, comparison, value },
  } = filters;

  const handleText = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
    const filteredData = data.filter((planet) => planet.name
      .toLowerCase().includes(target.value.toLowerCase()));
    setDataToUse(filteredData);
  };

  const handleSelect = ({ target: { name: nameSel, value: valueSel } }) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        [nameSel]: valueSel,
      },
    });
  };

  const handleClick = () => {
    switch (comparison) {
    case 'maior que':
      return setDataToUse(data
        .filter((planet) => Number(planet[column]) > Number(value)));
    case 'menor que':
      return setDataToUse(data
        .filter((planet) => Number(planet[column]) < Number(value)));
    case 'igual a':
      return setDataToUse(data
        .filter((planet) => Number(planet[column]) === Number(value)));
    default: return '';
    }
  };

  return (
    <form>
      <label htmlFor="nameFilter">
        Filtrar planetas:
        {' '}
        <input
          id="nameFilter"
          type="text"
          name="name"
          value={ name }
          data-testid="name-filter"
          onChange={ handleText }
          placeholder="Digite o nome do planeta"
        />
      </label>
      <label htmlFor="columnSel">
        <select
          id="columnSel"
          value={ column }
          name="column"
          data-testid="column-filter"
          onChange={ handleSelect }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparisonSel">
        <select
          id="comparisonSel"
          value={ comparison }
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleSelect }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valueInp">
        <input
          id="valueInp"
          type="number"
          name="value"
          value={ value }
          data-testid="value-filter"
          onChange={ handleSelect }
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </form>
  );
};

export default FilterInputs;
