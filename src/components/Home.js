import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, selectAllCountries } from '../redux/home/homeSlice';

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector(selectAllCountries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div>
      <h1>List of Countries</h1>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          {' '}
        </div>
      ))}
    </div>
  );
}

export default Home;
