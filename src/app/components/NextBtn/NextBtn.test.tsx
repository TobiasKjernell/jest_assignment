import { screen, render } from '@testing-library/react';
import NextBtn from '.';
import { IQuizSet } from '@/interfaces/interfaces';

test('should render a button', () => {
    render(<NextBtn answer={false} step={0} gameQuiz={[]} onClick={() => void {}} />)

    const nextBtn: HTMLButtonElement = screen.getByRole('button');

    expect(nextBtn).toBeInTheDocument();
})

test("should render disabled button if 'answer' is false ", () => {
    render(<NextBtn answer={false} step={0} gameQuiz={[]} onClick={() => void {}} />)

    const nextBtn: HTMLButtonElement = screen.getByRole('button');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
})

test("should render enabled button if 'answer' is true ", () => {
    render(<NextBtn answer={true} step={0} gameQuiz={[]} onClick={() => void {}} />)

    const nextBtn: HTMLButtonElement = screen.getByRole('button');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).not.toBeDisabled();
})

test("should render a button with text of 'Next' if 'answer' is true ", () => {
    render(<NextBtn answer={true} step={0} gameQuiz={[]} onClick={() => void {}} />)

    const nextBtn: HTMLButtonElement = screen.getByRole('button');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).not.toBeDisabled();
    expect(nextBtn.textContent).toBe('Next');
})

test("should render a button with text of 'See result' if on last step", () => {
    const mockData: IQuizSet = {
        question: 'question',
        answer: 0,
        alternatives: ['alternative']
    }
    const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]

    render(<NextBtn answer={true} step={mockGameSet.length - 1} gameQuiz={mockGameSet} onClick={() => void {}} />)

    const nextBtn: HTMLButtonElement = screen.getByRole('button');

    expect(nextBtn.textContent).toBe('See result');
})

