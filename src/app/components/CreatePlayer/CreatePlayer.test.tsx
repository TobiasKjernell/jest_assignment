import { screen, render, fireEvent, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePlayer from '.';

test('should render a label component with text: Pick a name', () => {
    render(<CreatePlayer setPlayer={() => { }} />);
    const labeltext = 'Pick a name';

    const text = screen.getByText(labeltext);

    expect(screen.getByLabelText(labeltext)).toBeInTheDocument();
    expect(text).toBe(text);
    expect(text).toBeInTheDocument();
})

test('should render a Start button', () => {
    render(<CreatePlayer setPlayer={() => { }} />)

    const startBtn = screen.getByRole('button', { name: /start game/i });

    expect(startBtn).toBeInTheDocument();
})

test('should render a input component with empty default value', () => {
    render(<CreatePlayer setPlayer={() => { }} />)

    const input = screen.getByLabelText(/pick a name/i) as HTMLInputElement;

    expect(input.value).toBe('');
})

test('should render a disabled Start button if input is less than 3', () => {
    const inputTextMock = 'p'.repeat(2);
    render(<CreatePlayer setPlayer={() => { }} />)

    const startBtn = screen.getByRole('button', { name: /start game/i });
    const input = screen.getByLabelText(/pick a name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: inputTextMock } })
    
    expect(input.value).toBe('pp');
    expect(startBtn).toBeDisabled();
})

test('should render a enabled Start button if input is more than 2', () => {
    const inputTextMock = 'p'.repeat(3);
    render(<CreatePlayer setPlayer={() => { }} />)

    const startBtn = screen.getByRole('button', { name: /start game/i });
    const input = screen.getByLabelText(/pick a name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: inputTextMock } })

    expect(input.value).toBe('ppp');
    expect(startBtn).not.toBeDisabled();
})

test('input can only take 15 characters', async() => {
    const inputTextMock = '1'.repeat(20);
    const user = userEvent.setup();
    render(<CreatePlayer setPlayer={() => { }} />)

    let input = screen.getByLabelText(/pick a name/i) as HTMLInputElement;
    await user.type(input, inputTextMock);

    expect(input.value.length).toBe(15);
})


