import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders home component by default', () => {
    render(<App />);
    const regionElement = screen.getAllByRole('button');
    expect(regionElement[0]).toBeInTheDocument();
  });
});
