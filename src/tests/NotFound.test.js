import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('The NotFound component:', () => {
  it('Displays an h2 heading with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading',
      { name: /Page requested not found/, level: 2 });
    expect(heading).toBeInTheDocument();
  });
  it('The page contains the Pokemon image', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu/);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
