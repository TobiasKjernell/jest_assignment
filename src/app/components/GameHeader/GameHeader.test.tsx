import { render, screen } from '@testing-library/react';
import GameHeader from '.';

test('should have a game title with: "Coffee Quiz"', () => {
    render(<GameHeader player={''} />);

    const titleEl: HTMLElement = screen.getByRole('heading', { level: 3, name: /coffee quiz/i });

    expect(titleEl).toBeInTheDocument();
})

test("should render text of the player's name (prefix: 'Player: '", () => {
    const mockPlayerName = 'tobias'
    render(<GameHeader player={mockPlayerName} />)

    const playerTextEl: HTMLElement = screen.getByText(mockPlayerName);

    expect(playerTextEl).toBeInTheDocument();
    expect(playerTextEl.textContent).toBe(mockPlayerName);
})