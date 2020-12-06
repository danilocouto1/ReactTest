import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do About:', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/about');
    expect(history.location.pathname).toBe('/about');
    const information = getByText(/This application simulates a Pokédex/);
    expect(information).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/about');
    expect(history.location.pathname).toBe('/about');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', async () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const img = getByRole('img');
    const srcImg = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(srcImg);
  });
});
