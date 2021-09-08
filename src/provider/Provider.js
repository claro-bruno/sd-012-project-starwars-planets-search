import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

class Provider extends Component {
  constructor() {
    super();
    this.state = {
      filters: {
        filterByName: {
          name: '',
        },
      },
      filteredPlanets: [],
      planets: '',
      wasFiltered: false,
    };
    this.getPlanets = this.getPlanets.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.toggleWasFiltered = this.toggleWasFiltered.bind(this);
  }

  async getPlanets() {
    const rawApiData = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const apiData = await rawApiData.json();
    this.setState({ planets: apiData.results });
  }

  submitFilters() {
    let filteredPlanets;
    const { filters: { filterByName }, planets } = this.state;
    if (filterByName.name !== '') {
      filteredPlanets = planets
        .filter((planet) => planet.name
          .toLowerCase().includes(filterByName.name
            .toLowerCase()));
    }
    this.setState({ filteredPlanets }, () => this.toggleWasFiltered());
  }

  filterByName(event) {
    if (event !== '' && event !== undefined) {
      this.setState({ filters: { filterByName: { name: event.target.value } } },
        () => this.submitFilters());
    } else {
      this.setState({ filters: { filterByName: { name: '' } } });
    }
  }

  toggleWasFiltered() {
    const { filters: { filterByName } } = this.state;
    if (filterByName.name === '') {
      this.setState({ wasFiltered: false });
    } else {
      this.setState({ wasFiltered: true });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={ {
          ...this.state,
          getPlanets: this.getPlanets,
          filterByName: this.filterByName,
          submitFilters: this.submitFilters,
          toggleWasFiltered: this.toggleWasFiltered,
        } }
      >
        { children }
      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.symbol]).isRequired,
};

export default Provider;
