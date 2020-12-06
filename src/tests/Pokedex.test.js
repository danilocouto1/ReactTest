import React from 'react';
import { fireEvent, render, getNodeText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force.',
  },
];

const pokemonFavorite = {
  4: false,
  25: false,
};

describe('"Next Pokémon" button shows next pokémon', () => {
  it('renders a button to move to next pokémon', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('moves to the next pokémon, one at a time', () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    const notExpectedPokemon = queryByText(/Pikachu/i);
    expect(notExpectedPokemon).not.toBeInTheDocument();
    fireEvent.click(button);
  });

  it('moves returns to first pokémon after reaching the last one', () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    const notExpectedPokemon = queryByText(/Charmander/i);
    expect(notExpectedPokemon).not.toBeInTheDocument();
  });
});

describe('Pokedex filters should filter by type', () => {
  it('Filters only one type of pokémon', () => {
    const { getByText, queryByText, getByTestId } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );
    const aboutText = getByText(/Encountered pokémons/i);
    expect(aboutText).toBeInTheDocument();
    const button = getByText(/Fire/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const expectedPokemon = getByText(/Charmander/i);
    const expectedType = getNodeText(getByTestId('pokemonType'));
    const notExpectedPokemon = queryByText(/Pikachu/i);
    expect(expectedPokemon).toBeInTheDocument();
    expect(expectedType).toBe('Fire');
    expect(notExpectedPokemon).not.toBeInTheDocument();
  });
});

describe('Pokedex filter buttons are rendered and functional', () => {
  it('cycles between pokémons of the filtered type', () => {
    const firePokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Fire',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'This intelligent Pokémon roasts hard berries with electricity.',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
        summary: 'The flame on its tail shows the strength of its life force.',
      },
    ];

    const { getByText, queryByText, getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <Pokedex pokemons={ firePokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );

    const filterButtons = getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(1);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemonButton = getByTestId('next-pokemon');
    fireEvent.click(nextPokemonButton);
    const secondPokemon = getByText(/Charmander/i);
    const expectedType = getNodeText(getByTestId('pokemonType'));
    const notExpectedPokemon = queryByText(/Pikachu/i);
    expect(secondPokemon).toBeInTheDocument();
    expect(expectedType).toBe('Fire');
    expect(notExpectedPokemon).not.toBeInTheDocument();
    fireEvent.click(nextPokemonButton);
    expect(firstPokemon).toBeInTheDocument();
  });
});

describe('Pokedex filter reset button is rendered', () => {
  it('Renders button to reset Pokémon type filter', () => {
    const { getByText, queryByText, getByTestId } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );
    const resetFilterButton = getByText(/All/i);
    expect(resetFilterButton).toBeInTheDocument();
    fireEvent.click(resetFilterButton);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemonButton = getByTestId('next-pokemon');
    fireEvent.click(nextPokemonButton);
    const expectedPokemon = getByText(/Charmander/i);
    const notExpectedPokemon = queryByText(/Pikachu/i);
    expect(expectedPokemon).toBeInTheDocument();
    expect(notExpectedPokemon).not.toBeInTheDocument();
  });
});

describe('Pokedex filter buttons are dynamically rendered', () => {
  it('Renders buttons to filter Pokémon type according to database', () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonFavorite } />
      </BrowserRouter>,
    );

    const numberOffilterButtons = 2;
    const filterButtons = getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(numberOffilterButtons);
    expect(getNodeText(filterButtons[0])).toBe('Electric');
    expect(getNodeText(filterButtons[1])).toBe('Fire');
    const resetFilterButton = getByText(/All/i);
    expect(resetFilterButton).toBeInTheDocument();
    fireEvent.click(filterButtons[0]);
    const disabledButton = getByTestId('next-pokemon');
    expect(disabledButton.disabled).toBe(true);
  });
});
