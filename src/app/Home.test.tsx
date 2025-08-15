import { screen, render, fireEvent, getByText } from '@testing-library/react';
import Home from './page';

test('should render CreatePlayer component when no player name picked and GameBoard component is not rendered', () => {
    render(<Home />)

    const createPalayerEl = screen.getByTestId('createPlayer');
    const gameBoardEl = screen.queryByRole('main');

    expect(gameBoardEl).not.toBeInTheDocument();
    expect(createPalayerEl).toBeInTheDocument();
    expect(createPalayerEl).toBeVisible();

})

test('should render GameBoard component when player name is picked and "Start" button is clicked ', () => {
    render(<Home />)
    const mockName = 'Tobias';

    let createPalayerEl = screen.queryByTestId('createPlayer');
    let gameBoardEl = screen.queryByRole('main');
    const startBtn: HTMLElement = screen.getByRole('button', { name: /start game/i });
    const input: HTMLInputElement = screen.getByLabelText(/pick a name/i);

    expect(gameBoardEl).not.toBeInTheDocument();
    expect(createPalayerEl).toBeInTheDocument();

    fireEvent.change(input, { target: { value: mockName } })
    fireEvent.click(startBtn);

    gameBoardEl = screen.queryByRole('main');
    createPalayerEl = screen.queryByTestId('createPlayer');

    expect(gameBoardEl).toBeInTheDocument();
    expect(createPalayerEl).not.toBeInTheDocument();

})

test('should render player name in GameBoard component when started', () => {
    render(<Home />)
    const mockName = 'Tobias';

    let createPalayerEl = screen.queryByTestId('createPlayer');
    let gameBoardEl = screen.queryByRole('main');
    const startBtn: HTMLElement = screen.getByRole('button', { name: /start game/i });
    const input: HTMLInputElement = screen.getByLabelText(/pick a name/i);

    expect(gameBoardEl).not.toBeInTheDocument();
    expect(createPalayerEl).toBeInTheDocument();

    fireEvent.change(input, { target: { value: mockName } })
    fireEvent.click(startBtn);

    gameBoardEl = screen.queryByRole('main');
    createPalayerEl = screen.queryByTestId('createPlayer');

    expect(gameBoardEl).toBeInTheDocument();
    expect(createPalayerEl).not.toBeInTheDocument();

    const playerNameEl = screen.getByText(mockName);
    expect(playerNameEl).toBeInTheDocument();

})