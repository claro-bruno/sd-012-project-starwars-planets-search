import React, { useContext } from 'react';
import contextApp from '../contextApp';

function Table() {
  const { data } = useContext(contextApp);
  const tableHeaders = [
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

  const filterPlanetsByName = () => {
    if (planetName) {
      return data.filter(
        (planet) => planet.name.toUpperCase().includes(planetName.toUpperCase()),
      );
    }
    return data;
  };
  const filtredPlanets = filterPlanetsByName();

  const renderTable = (planets) => (
    <div>
      <table>
        <tbody>
          <tr>
            {tableHeaders.map((header) => (
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
                <td>{planetName}</td>
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
  return renderTable(filtredPlanets);
}

export default Table;
