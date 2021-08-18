import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { planets, filters: { filterByName,
    numericFilter } } = useContext(MyContext);
  const planetData = filterByName.name
    ? planets.filterByName((planet) => planet.name.includes(filterByName.name)) : planets;

  const defaultNumericFilterValue = {
    column: '',
    comparison: '',
    value: 0,
  };

  const selectedFilter = numericFilter.length
    ? numericFilter[numericFilter.length - 1]
    : defaultNumericFilterValue;

  const { column, comparison, value } = selectedFilter;

  const handleFilters = planetData.filter((planet) => {
    switch (comparison) {
    case 'maior que':
      return planet[column] > value;
    case 'igual a':
      return Number(planet[column]) === value;
    case 'menor que':
      return planet[column] < value;
    default:
      return true;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>

      <tbody>
        { handleFilters.map((planet, index) => (
          <tr key={ index }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
