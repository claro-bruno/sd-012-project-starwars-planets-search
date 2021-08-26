import React from 'react';
import MyContext from '../Context';

function InputValue() {
  return (
    <div>
      <label htmlFor="filter-value">
        Filter by value
        <MyContext.Consumer>
          {
            ({ handle }) => (
              <input
                type="number"
                name="filter-value"
                id="filter-value"
                onChange={ handle }
                data-testid="value-filter"
              />
            )
          }
        </MyContext.Consumer>
      </label>
    </div>

  );
}

export default InputValue;
