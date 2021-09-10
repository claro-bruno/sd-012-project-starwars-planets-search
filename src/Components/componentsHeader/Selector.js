import React from 'react';
import { string, func, arrayOf } from 'prop-types';

function Selector(props) {
  const { testid, handleChange, value, options, name } = props;

  return (
    <select
      data-testid={ testid }
      name={ name }
      value={ value }
      onChange={ handleChange }
    >
      {
        options
          .map(
            (item, index) => <option key={ index } value={ item }>{ item }</option>,
          )
      }
    </select>
  );
}

Selector.propTypes = {
  testid: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  options: arrayOf(string).isRequired,
  name: string.isRequired,
};

export default Selector;