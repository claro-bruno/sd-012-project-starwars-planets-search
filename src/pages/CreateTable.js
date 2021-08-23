import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
// Feito com a ajuda de colegas Djaniza, Camila e Cristiano e mentoria do Márcio Daniel.

function CreateTable() {
  const data = useContext(MyContext);
  const [filter, setfilter] = useState({
    filterByName: {
      name: '',
    },
  });
  // Requisito 02
  const [filtered, setfiltered] = useState([]);

  const [SetColumns] = useState(
    ['population', 'orbital_period', 'rotation_period', 'surface_water', 'diameter'],
  );
  // Requisito 03
  const [filterByNumericValues, setfilterByNumericValues] = useState(
    {
      column: 'population',
      comparison: '',
      value: '100000',
    },
  );
  useEffect(() => {
    function handleFilterDataByInput() {
      let newArray = [...data];
      if (newArray.length > 0 && filter.filterByName.name) {
        newArray = newArray
          .filter((item) => item.name.toLowerCase()
            .includes(filter.filterByName.name.toLowerCase()));
      }
      setfiltered(newArray);
    }
    handleFilterDataByInput();
  },
  [data, filter]);

  const handleInputCharacter = ({ target: { value } }) => {
    setfilter({
      ...filter,
      filterByName: {
        name: value,
      },
    });
  };
  // Filtro de números feito com a ajuda de Cristiano e mentorias com o Márcio Daniel
  const handleFilterByNumericValue = () => {
    const { column, comparison, value } = filterByNumericValues;
    switch (comparison) {
    case 'maior que':
      return setfiltered(filtered.filter((planet) => planet[column] > Number(value)));
    case 'menor que':
      return setfiltered(filtered.filter((planet) => planet[column] < Number(value)));
    case 'igual a':
      return setfiltered(filtered.filter((planet) => planet[column] === value));
    default:
      return filtered;
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={ (e) => handleInputCharacter(e) }
        data-testid="name-filter"
      />
      <form>
        <label htmlFor="column">
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            onChange={ ({ target }) => (setfilterByNumericValues({
              ...filterByNumericValues,
              column: target.value,
            })) }
          >
            {SetColumns.map((column, index) => (
              <option key={ index } value={ column }>{ column }</option>)) }
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            onChange={ ({ target }) => (setfilterByNumericValues({
              ...filterByNumericValues,
              comparison: target.value,
            })) }
          >
            <option value="" defaultValue>Selecione sua opção</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            data-testid="value-filter"
            id="value"
            name="value"
            onChange={ ({ target }) => (setfilterByNumericValues({
              ...filterByNumericValues,
              value: target.value,
            })) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          name="add-filter"
          onClick={ handleFilterByNumericValue }
        >
          Filter
        </button>
      </form>
      <table className="table">
        <tbody>
          <tr>
            <th>Planet</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
          {
            filtered.map((planet, index) => (
              <tr key={ index }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films.map((film, i) => (<p key={ i }>{ film }</p>)) }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>
                  <a
                    href={ planet.url }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    { planet.url }
                  </a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default CreateTable;
