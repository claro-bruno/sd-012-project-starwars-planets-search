import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import * as API from '../service/StarWarsAPI';
import Input from './components/Input';
import Select from './components/Select';
import { filterByNumber, filterByName } from './Filter';

function getInputArray(guide) {
  const { value } = guide.filterNumber;
  return [
    {
      handleChange: guide.handleChange,
      name: 'filterName',
      text: 'Nome:',
      type: 'text',
      testId: 'name-filter',
      value: guide.filterName,
      placeholder: 'Planet Name',
    },
    {
      handleChange: guide.handleChange,
      name: 'value',
      text: 'Valor:',
      type: 'number',
      testId: 'value-filter',
      value,
      placeholder: 'Ex: 5000',
    },
  ];
}

function getSelectColumnOptions() {
  return [
    { value: 'population', disabled: false },
    { value: 'orbital_period', disabled: false },
    { value: 'diameter', disabled: false },
    { value: 'rotation_period', disabled: false },
    { value: 'surface_water', disabled: false },
  ];
}

function getSelectComparisonOptions() {
  return [
    { value: 'maior que', disabled: false },
    { value: 'menor que', disabled: false },
    { value: 'igual a', disabled: false },
  ];
}

function manageComparisonOptions({ comparison }) {
  const myOptions = getSelectComparisonOptions().slice();
  // const error = -1;
  // const optionIndex = myOptions.findIndex((option) => option.value === column);
  // if (optionIndex !== error) myOptions[optionIndex].disabled = true;

  return myOptions.filter((option) => option.value !== comparison);
}

function manageColumnOptions({ column }) {
  const myOptions = getSelectColumnOptions().slice();
  // const error = -1;
  // const optionIndex = myOptions.findIndex((option) => option.value === comparison);
  // if (optionIndex !== error) myOptions[optionIndex].disabled = true;

  return myOptions.filter((option) => option.value !== column);
}

function getInput({
  handleChange = null,
  name = '',
  text = '',
  type = 'text',
  testId = 'none',
  value = null,
  placeholder = '',
}) {
  return (
    <Input
      testId={ testId }
      text={ text }
      name={ name }
      type={ type }
      placeholder={ placeholder }
      value={ value }
      handleChange={ handleChange }
    />
  );
}

function getSelect({
  handleChange = null,
  name = 'select-input',
  text = 'Select:',
  testId = 'none',
  optionList = null,
}) {
  return (
    <Select
      handleChange={ handleChange }
      name={ name }
      text={ text }
      testId={ testId }
      optionList={ optionList }
    />
  );
}

export default function PlanetFilter() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [filterName, setFilterName] = useState('');
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterNumber, setfilterNumber] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [selection, setSelection] = useState({
    column: '',
    comparison: '',
  });
  const constelation = useRef(planets);
  const universe = useRef(allPlanets);
  const newFilterNumber = useRef(filterNumber);
  // const newFilterName = useRef(filterName);

  const fillPlanets = useCallback(async () => {
    // const myPlanets = await API.getPlanetsFirstPage();
    const myPlanets = await API.getMock();
    setPlanets(myPlanets);
    // myPlanets = await API.getAllPlanets();
    setAllPlanets(myPlanets);
  }, [setPlanets, setAllPlanets]);
  useEffect(() => {
    if (universe.current.length <= 0) {
      // && (!newFilterNumber.current.column
      // && !newFilterNumber.current.comparison
      // && !newFilterNumber.current.value)) {
      fillPlanets();
      console.log('useEffect 0\n', constelation.current, '\n', universe.current);
    }
  }, [universe, fillPlanets]);
  useEffect(() => {
    console.log('useEffect 1');
    if (filterName) {
      filterByName(filterName, allPlanets, setPlanets);
    }
    if (!filterName && allPlanets.length > 0
      && (!newFilterNumber.current.column
          || !newFilterNumber.current.comparison
          || !newFilterNumber.current.value)) {
      setPlanets(allPlanets);
    }
  }, [filterName, setPlanets]);// , [filterName, planets, allPlanets, setPlanets]);
  useEffect(() => {
    console.log('useEffect 2');
    if (filterNumber.column !== ''
      && filterNumber.comparison !== ''
      && filterNumber.value !== '') {
      filterByNumber(filterNumber, allPlanets, setPlanets);
      console.log('useEffect 2.1');
    }
    if ((!filterNumber.column
      || !filterNumber.comparison
      || !filterNumber.value)
      && (allPlanets.length > 0)) {
      setPlanets(allPlanets);
      console.log('useEffect 2.2');
    }
  }, [setPlanets, filterNumber]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
    case 'filterName':
      setFilterName(value);
      break;
    case 'column':
      setfilterNumber((prevState) => (
        { ...prevState, column: value }
      ));
      setSelection((prevState) => (
        { ...prevState, column: value }
      ));
      break;
    case 'comparison':
      setfilterNumber((prevState) => (
        { ...prevState, comparison: value }
      ));
      setSelection((prevState) => (
        { ...prevState, comparison: value }
      ));
      break;
    case 'value':
      setfilterNumber((prevState) => (
        { ...prevState, value }
      ));
      break;
    default:
    }
  };

  return (
    <section>
      <header>
        <h1>Header</h1>
        { getInput(getInputArray({ handleChange, filterName, filterNumber })[0]) }
        <section>
          { getSelect({
            handleChange,
            text: 'Column:',
            testId: 'column-filter',
            name: 'column',
            optionList: manageColumnOptions(selection),
          })}
          { getSelect({
            handleChange,
            text: 'Comparison:',
            testId: 'comparison-filter',
            name: 'comparison',
            optionList: manageComparisonOptions(selection), // getSelectComparisonOptions(),
          })}
          { getInput(getInputArray({ handleChange, filterName, filterNumber })[1]) }
          <button
            data-testid="button-filter"
            type="button"
          >
            Filter
          </button>
        </section>
      </header>
    </section>
  );
}
