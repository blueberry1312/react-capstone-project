import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, selectAllCountries } from '../redux/home/homeSlice';

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector(selectAllCountries);

  const [regionFilter, setRegionFilter] = useState('');

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleRegionFilterChange = (event) => {
    setRegionFilter(event.target.value);
  };

  const filteredCountries = countries
    .filter(
      (country) => country.region.toLowerCase().includes(regionFilter.toLowerCase()),
    )
    .map((country) => (
      <div key={country.cca3}>
        {country.name.common}
        {' '}
        -
        {country.region}
      </div>
    ));

  return (
    <div>
      <h1>List of Countries</h1>
      <div>
        Filter by region:
        {' '}
        <select value={regionFilter} onChange={handleRegionFilterChange}>
          <option value="">All countries</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      {filteredCountries}
    </div>
  );
}

export default Home;
