import React, { useContext } from 'react';

import { FiltersContext } from '../context';

function FilterByNumericValues() {
  const { filters } = useContext(FiltersContext);
  const { value, setValue } = filters;

  return (
    <form>
      <label htmlFor="value">
        Value:
        <input
          data-testid="value-filter"
          id="value"
          type="number"
          value={ value }
          onChange={ ({ target }) => {
            setValue(target.value);
          } }
        />
      </label>
    </form>
  );
}

export default FilterByNumericValues;