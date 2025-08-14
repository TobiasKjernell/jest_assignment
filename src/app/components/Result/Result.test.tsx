import { screen, render } from '@testing-library/react';
import Result, { IResult } from '.';

test('should render a text of score result', () => {
    const mockData: IResult = {
        rightAnswers: 3,
        amountOfAnswers: 4,
        onClick: function (): void { }
    }
    render(<Result rightAnswers={mockData.rightAnswers} amountOfAnswers={mockData.amountOfAnswers} onClick={() => { }} />)

    const scoreText = screen.getByText(/right answers!/i)

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

    const btn = screen.getByRole('button', { name: /Play again/i })

    expect(btn).toBeInTheDocument();
})