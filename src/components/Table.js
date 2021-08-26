import React, { useContext } from 'react';
import AppContext from '../Context/appContext';

function Table() {
  const {
    info,
    filters: { filterByName: { name },
      filterByNumericValues,
    } } = useContext(AppContext);
  const tableHeading = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];

  const filterByName = () => {
    if (name) {
      return info.filter(
        (planet) => planet.name.toUpperCase().includes(name.toUpperCase()),
      );
    }
    return info;
  };

  let filteredPlanets = filterByName();

  const filterPlanetsByValues = () => {
    if (filterByNumericValues) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        switch (comparison) {
        case 'maior que':
          filteredPlanets = filteredPlanets.filter(
            (planet) => (parseInt(planet[column], 10) > value),
          );
          break;
        case 'menor que':
          filteredPlanets = filteredPlanets.filter(
            (planet) => (parseInt(planet[column], 10) < value),
          );
          break;
        case 'igual a':
          filteredPlanets = filteredPlanets.filter(
            (planet) => parseInt(planet[column], 10) === parseInt(value, 10),
          );
          break;
        default:
          break;
        }
      });
    }
  };
  filterPlanetsByValues();

  const renderTable = (planets) => (
    <div>
      <table>
        <tbody>
          <tr>
            {tableHeading.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
          {planets.map(
            ({
              name: planetName,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ planetName }>
                <td data-testid="planet-name">{planetName}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
  return renderTable(filteredPlanets);
}

export default Table;
