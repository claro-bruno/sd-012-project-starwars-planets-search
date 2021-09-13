import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const { data } = props;

  const header = ['name',
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

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {header.map((key, index) => (
              <th key={ index }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet, index) => {
            const { name,
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
              url } = planet;
            return (
              <tr key={ index }>
                <td key={ planet[index] } data-testid="planet-name">{name}</td>
                <td key={ planet[index] }>{rotationPeriod}</td>
                <td key={ planet[index] }>{orbitalPeriod}</td>
                <td key={ planet[index] }>{diameter}</td>
                <td key={ planet[index] }>{climate}</td>
                <td key={ planet[index] }>{gravity}</td>
                <td key={ planet[index] }>{terrain}</td>
                <td key={ planet[index] }>{surfaceWater}</td>
                <td key={ planet[index] }>{population}</td>
                <td key={ planet[index] }>{films}</td>
                <td key={ planet[index] }>{created}</td>
                <td key={ planet[index] }>{edited}</td>
                <td key={ planet[index] }>{url}</td>
              </tr>);
          })}

        </tbody>

      </table>

    </div>

  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Table;
