import React, { useContext, useEffect, useState } from 'react';
import FilterList from '../components/FilterList';
import myContext from '../context/myContext';

export default function Home() {
  const { planets } = useContext(myContext);
  const filterNumberOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [usedArrayOfNumber, setUsedArrayOfNumber] = useState([]);
  const [newArrayofFilter, setNewArrayOfFilter] = useState(filterNumberOptions);
  const [filterWithNumber, setfilterWithNumber] = useState({
    columnSetup: 'population',
    comparisonSetup: 'maior que',
    valueSetup: '1',
  });
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
    ],
    order: {
      column: 'Name',
      sort: 'ASC',
    },
  });
  const [FilterWithNameAndNumber, setFilterWithNameAndNumber] = useState('');
  const [FilterWithNameAndNumber2, setFilterWithNameAndNumber2] = useState('');
  const [filterNumberAmount, setFilterNumberAmount] = useState(0);
  const [shouldFilterNumber, setshouldFilterNumber] = useState(false);
  useEffect(() => {
    const filterPlanet = () => {
      if (planets) {
        const filterName = filters.filterByName.name;
        const filterNameInArray = (obj) => {
          if (obj.name.includes(filterName)) {
            return true;
          }
          return false;
        };
        const filteredName = planets.filter(filterNameInArray);
        setFilterWithNameAndNumber(filteredName);
        setFilterWithNameAndNumber2(filteredName);
      }
    };
    filterPlanet();
  },
  [filters.filterByName.name]);
  //   [filters.filterByName.name]);
  useEffect(() => {
    const newArrayColumn = () => {
      const arrayToSet = filterNumberOptions
        .filter((used) => !usedArrayOfNumber.includes(used));
      setNewArrayOfFilter(arrayToSet);
    };
    newArrayColumn();
  },
  [shouldFilterNumber, usedArrayOfNumber]);
  //  [shouldFilterNumber, usedArrayOfNumber]);
  function comparisonSwitch(obj) {
    const { column, value, comparison } = filters
      .filterByNumericValues[filterNumberAmount];
    switch (comparison) {
    case 'maior que':
      if (parseFloat(obj[column]) > parseFloat(value)) {
        return true;
      }
      return false;
    case 'menor que':
      if (parseFloat(obj[column]) < parseFloat(value)) {
        return true;
      }
      return false;
    case 'igual a':
      if (parseFloat(obj[column]) === parseFloat(value)) {
        return true;
      }
      return false;
    default:
      break;
    }
  }
  useEffect(() => {
    if ((planets || FilterWithNameAndNumber2) && shouldFilterNumber
    && filters.filterByNumericValues) {
      const filterData = () => {
        const usedArray = !FilterWithNameAndNumber2 ? planets : FilterWithNameAndNumber2;
        filters.filterByNumericValues.forEach((filter) => {
          const { column, comparison, value } = filter;
          const filterRound = usedArray.filter((obj) => {
            switch (comparison) {
            case 'maior que':
              if (parseFloat(obj[column]) > parseFloat(value)) {
                return true;
              }
              return false;
            case 'menor que':
              if (parseFloat(obj[column]) < parseFloat(value)) {
                return true;
              }
              return false;
            case 'igual a':
              if (parseFloat(obj[column]) === parseFloat(value)) {
                return true;
              }
              return false;
            default:
              break;
            }
          });
          setFilterWithNameAndNumber2(filterRound);
          setUsedArrayOfNumber([...usedArrayOfNumber, filterWithNumber.columnSetup]);
          setfilterWithNumber({ ...filterWithNumber, columnSetup: newArrayofFilter[1] });
          setshouldFilterNumber(false);
          /* console.log(i, column, comparison, value);
          console.log(FilterWithNameAndNumber2);
          console.log(usedArray); */
        });
      };
      filterData();
    }
  },
  [filters.filterByNumericValues, shouldFilterNumber, usedArrayOfNumber]);

  /* useEffect(() => {
    const filterPlanetWithNumber = () => {
      if ((planets || FilterWithNameAndNumber) && shouldFilterNumber) {
        const usedArray = !FilterWithNameAndNumber ? planets : FilterWithNameAndNumber;
        usedArray.sort((a,b) => (a['name'] > b['name']) ? 1 : ((b['name'] > a['name']) ? -1 : 0))
        const filteredwithNumber = usedArray.filter(comparisonSwitch);
        console.log(usedArray);
        setFilterWithNameAndNumber(filteredwithNumber);
        setFilterNumberAmount(filterNumberAmount + 1);
        setUsedArrayOfNumber([...usedArrayOfNumber, filterWithNumber.columnSetup]);
        setfilterWithNumber({ ...filterWithNumber, columnSetup: newArrayofFilter[1] });
        setshouldFilterNumber(false);
      }
    };
    filterPlanetWithNumber();
  },
  [FilterWithNameAndNumber, filterWithNumber, shouldFilterNumber, usedArrayOfNumber]); */
  //  [filterWithNumber, shouldFilterNumber, usedArrayOfNumber]);
  function renderPlanets() {
    const usedArray = !FilterWithNameAndNumber2 ? planets : FilterWithNameAndNumber2;
    return (
      Object.values(usedArray).map((planetas, index) => (
        <tr key={ index }>
          <td>{planetas.name}</td>
          <td>{planetas.rotation_period}</td>
          <td>{planetas.orbital_period}</td>
          <td>{planetas.diameter}</td>
          <td>{planetas.climate}</td>
          <td>{planetas.gravity}</td>
          <td>{planetas.terrain}</td>
          <td>{planetas.surface_water}</td>
          <td>{planetas.population}</td>
        </tr>
      )));
  }
  function getFilterNamePlanets({ target }) {
    const { value } = target;
    setFilters({ ...filters,
      filterByName: { name: value },
    });
  }
  function getFilterNumber() {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, {
        column: filterWithNumber.columnSetup,
        comparison: filterWithNumber.comparisonSetup,
        value: filterWithNumber.valueSetup,
      }],
    });
    setshouldFilterNumber(true);
  }
  function getNumberSetup({ target }) {
    const { value, name } = target;
    setfilterWithNumber({ ...filterWithNumber,
      [name]: value,
    });
  }
  function removeItem({ target }) {
    const { id } = target;
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues.filter((obj) => {if (obj.column !== id) {
        return true;
      }
      return false;
    })],
    });
    setFilterWithNameAndNumber2(planets);
    setshouldFilterNumber(true);
  }

  return (
    <div>
      <label htmlFor="filterByName">
        Filtro por nome:
        <input
          type="text"
          name="filterByName"
          id="filterByName"
          data-testid="name-filter"
          onChange={ getFilterNamePlanets }
        />
      </label>
      <label htmlFor="columnSetup">
        Filtro por número:
        <select
          type="select"
          name="columnSetup"
          id="columnSetup"
          data-testid="column-filter"
          onChange={ getNumberSetup }
        >
          {Object.values(newArrayofFilter).map((number, i) => (
            <option key={ i }>{number}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparisonSetup">
        <select
          type="select"
          name="comparisonSetup"
          id="comparisonSetup"
          data-testid="comparison-filter"
          onChange={ getNumberSetup }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="valueSetup">
        <input
          type="number"
          name="valueSetup"
          placeholder="1"
          id="valueSetup"
          data-testid="value-filter"
          onChange={ getNumberSetup }
        />
      </label>
      <button
        type="submit"
        name="button-filter"
        id="button-filter"
        data-testid="button-filter"
        onClick={ getFilterNumber }
      >
        Filtrar
      </button>
      <ul>
        { filters.filterByNumericValues.length === 0 ? ''
          : Object.values(filters.filterByNumericValues).map((filter, index) => (
            <li 
            data-testid="filter" key={ index }>
              {filter.column}
              {filter.comparison}
              {filter.value}
              <button
                id={filter.column}
                type="button"
                onClick={ removeItem }
              >
              x
              </button>
            </li>
          ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotação</th>
            <th>Orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Superície da Água</th>
            <th>População</th>
            <th>Residentes</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
          </tr>
        </thead>
        <tbody>
          {renderPlanets()}
        </tbody>
      </table>
    </div>);
}
