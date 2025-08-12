import { screen, render, fireEvent, getByLabelText } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import CreatePlayer from '.';


describe('button tests', () => {

    test('should render a Start button', () => {
        render(<CreatePlayer setPlayer={() => { }} />)

        const startBtn:HTMLElement = screen.getByRole('button', { name: /start game/i });

        expect(startBtn).toBeInTheDocument();
    })

    test('should render a disabled Start button if input is less than 3', () => {
        const inputTextMock = 'p'.repeat(2);
        render(<CreatePlayer setPlayer={() => { }} />)

        const startBtn:HTMLElement = screen.getByRole('button', { name: /start game/i });
        const input:HTMLInputElement = screen.getByLabelText(/pick a name/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: inputTextMock } })

        expect(input.value).toBe('pp');
        expect(startBtn).toBeDisabled();
    })

    test('should render a enabled Start button if input is more than 2', () => {
        const inputTextMock:string = 'p'.repeat(3);
        render(<CreatePlayer setPlayer={() => { }} />)

        const startBtn:HTMLElement = screen.getByRole('button', { name: /start game/i });
        const input:HTMLInputElement = screen.getByLabelText(/pick a name/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: inputTextMock } })

        expect(input.value).toBe('ppp');
        expect(startBtn).not.toBeDisabled();
    })

})

describe('input tests', () => {

    test('should render a input component with empty default value', () => {
        render(<CreatePlayer setPlayer={() => { }} />)

        const input:HTMLInputElement = screen.getByLabelText(/pick a name/i) as HTMLInputElement;

        expect(input.value).toBe('');
    })

    test('input can only take 15 characters', async () => {
        const inputTextMock:string = '1'.repeat(20);
        const user:UserEvent = userEvent.setup();
        render(<CreatePlayer setPlayer={() => { }} />)

        let input:HTMLInputElement = screen.getByLabelText(/pick a name/i) as HTMLInputElement;
        await user.type(input, inputTextMock);

        expect(input.value.length).toBe(15);
    })

})

describe('label tests', () => {

    test('should render a label component with text: Pick a name', () => {
        const labeltext:string = 'Pick a name';
        render(<CreatePlayer setPlayer={() => { }} />);

        const text:HTMLElement = screen.getByText(labeltext);

        expect(screen.getByLabelText(labeltext)).toBeInTheDocument();
        expect(text).toBe(text);
        expect(text).toBeInTheDocument();
    })

})











