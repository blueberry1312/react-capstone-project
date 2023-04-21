import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryList from '../components/CountryList';

const mockCountries = [
  {
    cca3: 'ABC',
    name: { common: 'Country A' },
    region: 'Region 1',
    population: 100000,
  },
  {
    cca3: 'DEF',
    name: { common: 'Country B' },
    region: 'Region 2',
    population: 200000,
  },
];

describe('CountryList component', () => {
  test('renders filtered countries', () => {
    render(<CountryList countries={mockCountries} regionFilter="Region 1" />);

    expect(screen.getByText(/Country A/)).toBeInTheDocument();
    expect(screen.queryByText(/Country B/)).toBeNull();
  });
});
