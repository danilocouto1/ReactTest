import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('The informations about the selected Pokemon appear in the page', () => {
  const { getByText, queryByText, getByRole } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  expect(getByText('Pikachu Details')).toBeInTheDocument();

  expect(queryByText(/More details/i)).not.toBeInTheDocument();

  const headingSummary = getByRole('heading', { name: 'Summary', level: 2 });
  expect(headingSummary).toBeInTheDocument();

  const paragraph = getByText(
    /This intelligent Pokémon roasts hard berries with electricity to make/i,
  );
  expect(paragraph).toBeInTheDocument();
});

test('There is a section with maps', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();

  expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
  expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();

  const images = getAllByRole('img');
  expect(images[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(images[1]).toHaveAttribute('alt', 'Pikachu location');

  expect(images[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(images[2]).toHaveAttribute('alt', 'Pikachu location');
});

test('The user can choose the Pokemon as favorite', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  const favoriteCheck = getByText(/Pokémon favorito?/i);
  fireEvent.click(favoriteCheck);
  const images = getAllByRole('img');
  const number = 4;
  expect(images.length).toBe(number);
  fireEvent.click(favoriteCheck);
  const images2 = getAllByRole('img');
  const number2 = 3;
  expect(images2.length).toBe(number2);
});
