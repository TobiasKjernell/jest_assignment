import { screen, render, within } from '@testing-library/react';
import QuizArea from '.';
import { IQuizSet } from '@/interfaces/interfaces';

test('should render a text with question-data', () => {
    const mockData: IQuizSet = {
        question: 'question',
        answer: 0,
        alternatives: ['alternative']
    }
    const step: number = 2;
    const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
    render(<QuizArea gameQuiz={mockGameSet} step={step} answer={false} onClick={(): void => { }} />)

    const questionEl: HTMLElement = screen.getByRole('heading', { level: 3, name: mockGameSet[step].question })

    expect(questionEl).toBeInTheDocument();
    expect(questionEl.textContent).toBe(mockGameSet[step].question);
});

describe('list buttons (alternatives)', () => {

    test("should render amount 'alternatives'-buttons equal to alternative length", () => {
        const mockData: IQuizSet = {
            question: 'question',
            answer: 0,
            alternatives: ['alternative', 'alternative', 'alternative', 'alternative',]
        }
        const step: number = 2;
        const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
        render(<QuizArea gameQuiz={mockGameSet} step={step} answer={false} onClick={(): void => { }} />);

        const altItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
        const altBtns: HTMLButtonElement[] = altItems.map((item) => within(item).getByRole('button'))

        expect(altBtns.length).toBe(mockGameSet[step].alternatives.length);
        expect(altItems.length).toBe(mockGameSet[step].alternatives.length);

    });

    test("should render button-text according to button-alternative", () => {
        const mockData: IQuizSet = {
            question: 'question',
            answer: 0,
            alternatives: ['1', '2', '3', '4']
        }
        const step: number = 2;
        const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
        render(<QuizArea gameQuiz={mockGameSet} step={step} answer={false} onClick={(): void => { }} />);

        const altBtns: HTMLButtonElement[] = screen.queryAllByTestId('alternative-item');

        expect(altBtns.length).toEqual(mockGameSet[step].alternatives.length);//same
        expect(altBtns.length).toBe(4); //same
        altBtns.forEach((item, index) => expect(within(item).getByRole('button').textContent).toBe(mockGameSet[step].alternatives[index]))
    })

    test('buttons should be enabled as default', () => {
        const mockData: IQuizSet = {
            question: 'question',
            answer: 0,
            alternatives: ['1', '2', '3', '4']
        }
        const step: number = 2;
        const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
        render(<QuizArea gameQuiz={mockGameSet} step={step} answer={false} onClick={(): void => { }} />);

        const altItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');

        expect(altItems.length).toEqual(mockGameSet[step].alternatives.length);
        altItems.forEach((item) => expect(within(item).getByRole('button')).not.toBeDisabled())
    })

        test('buttons should be disabled if answered', () => {
        const mockData: IQuizSet = {
            question: 'question',
            answer: 0,
            alternatives: ['1', '2', '3', '4']
        }
        const step: number = 2;
        const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
        render(<QuizArea gameQuiz={mockGameSet} step={step} answer={true} onClick={(): void => { }} />);

        const altItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');

        expect(altItems.length).toEqual(mockGameSet[step].alternatives.length);
        altItems.forEach((item) => expect(within(item).getByRole('button')).toBeDisabled())
    })
})

