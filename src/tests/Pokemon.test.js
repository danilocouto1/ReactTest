import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('tests for the Pokemon component', () => {
  it('should render the Pokémon card information', () => {
    const { getByRole, getByText, getAllByText } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', { name: 'More details' });
    fireEvent.click(detailsButton);

    const pokemonName = getByText('Pikachu');
    const occurrencesOfElectric = getAllByText('Electric');
    const pokemonType = occurrencesOfElectric[0];
    const pokemonWeight = getByText(/average weight: 6.0 kg/i);
    const pokemonImage = getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('should render a link with the Pokémon id in its URL', () => {
    const { getByRole } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', { name: /more details/i });
    expect(detailsButton.href).toBe('http://localhost/pokemons/25');
  });

  it('should render the details page after clicking \'more details\' button', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const homeUrl = history.location.pathname;
    expect(homeUrl).toBe('/');
    const detailsButton = getByRole('link', { name: /more details/i });
    fireEvent.click(detailsButton);
    const moreDetailsUrl = history.location.pathname;
    expect(moreDetailsUrl).toBe('/pokemons/25');
  });

  it('should render a star image if a Pokémon is in the favorite\'s list', () => {
    const { getByRole } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', { name: /more details/i });
    fireEvent.click(detailsButton);
    const checkFavorite = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    fireEvent.click(checkFavorite);
    const starImage = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starImage).toBeInTheDocument();
    const expectedStarImageSrc = starImage.src.split('localhost')[1];
    expect(expectedStarImageSrc).toBe('/star-icon.svg');
    expect(starImage.alt).toBe('Pikachu is marked as favorite');
  });
});
