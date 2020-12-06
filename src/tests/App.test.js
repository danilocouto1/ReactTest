import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App Pokédex is rendering correctly', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('App Pokédex header renders correct links', () => {
  it('renders a "Home" link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders an "About" link', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders a "Favorite Pokémons" link', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const favPokemonsLink = getByText(/Favorite Pokémons/i);
    expect(favPokemonsLink).toBeInTheDocument();
    expect(favPokemonsLink).toHaveAttribute('href', '/favorites');
  });
});

describe('App Pokédex Header links are redirecting correctly', () => {
  it('Redirects to Home when link is clicked`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText(/Home/i);
    fireEvent.click(homeLink);
    const aboutText = getByText(/Encountered pokémons/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('redirects to About when link is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('redirects to Favorites when link is clicked', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const favPokemonsLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favPokemonsLink);
    const favPokemonsText = getAllByText(/Favorite pokémons/i);
    expect(favPokemonsText[1]).toBeInTheDocument();
  });

  it('redirects to a "Not Found" page when invalid url is typed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/my-bad-url/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
