import React from 'react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Favorite Pokemons', () => {
  it('No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const texto = getByText('No favorite pokemon found');
    expect(texto).toBeInTheDocument();
  });

  it('é exibido todos os cards de pokémons favoritados', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[0], pokemons[1]] } />,
    );

    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Charmander')).toBeInTheDocument();
    expect(queryByText('Caterpie')).not.toBeInTheDocument();
  });
});
