import React, { useContext } from 'react';

import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const {
    data,
    filter: { filterByName: { name } },
    filter,
    setFilter,
  } = useContext(PlanetContext);

  const nameFilter = data.filter((planet) => (
    planet.name.toLowerCase().includes(name)
  ));

  const handleChange = ({ target: { value } }) => {
    setFilter({
      ...filter,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Nome do planeta"
        data-testid="name-filter"
        onChange={ (e) => handleChange(e) }
      />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de Rotação</th>
            <th>Perpiodo Orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Superfície da Água</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {nameFilter.map((planet, idx) => (
            <tr key={ idx }>
              <td data-testid="planet-name">{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}