import { screen, render } from '@testing-library/react';
import Result from '.';
import { IResult } from '@/interfaces/interfaces';

test('should render a text of score result', () => {
    const mockData: IResult = {
        rightAnswers: 3,
        amountOfAnswers: 4,
        onClick: function (): void { }
    }
    render(<Result rightAnswers={mockData.rightAnswers} amountOfAnswers={mockData.amountOfAnswers} onClick={() => { }} />)

    const scoreText: HTMLElement = screen.getByText(/right answers!/i)

    expect(scoreText).toBeInTheDocument();
    expect(scoreText.textContent).toContain(`${mockData.rightAnswers}`);
    expect(scoreText.textContent).toContain(`${mockData.amountOfAnswers}`);
})

test("should render a 'Play again' button", () => {
    const mockData: IResult = {
        rightAnswers: 3,
        amountOfAnswers: 4,
        onClick: function (): void { }
    }
    render(<Result rightAnswers={mockData.rightAnswers} amountOfAnswers={mockData.amountOfAnswers} onClick={() => { }} />)

    const btn: HTMLButtonElement = screen.getByRole('button', { name: /Play again/i })

    expect(btn).toBeInTheDocument();
})