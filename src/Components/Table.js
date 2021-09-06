import React, { useState, useEffect } from 'react';
import GetPlanetFetchAPI from '../services/planetsAPI';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [data] = GetPlanetFetchAPI();

  useEffect(() => {
    setPlanets(data);
  }, [data]);

  const planetsData = () => {
    if (planets.length > 0) {
      return (
        <thead>
          <tr>
            {
              planets.map((planet) => Object.keys(planet))[0]
                .filter((keys) => keys !== 'residents')
                .map((key, index) => <th key={ index }>{key}</th>)
            }
          </tr>
        </thead>

      );
    }
  };

  const list = () => {
    if (planets.length > 0) {
      return (
        <tbody>
          {
            planets.map((planet, index) => (
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
            ))
          }
        </tbody>
      );
    }
  };

  return (
    <table>
      {planetsData()}
      {list()}
    </table>
  );
}

export default Table;
