import { render, screen } from '@testing-library/react';
import ProgressBar from '.';
import { IQuizSet } from '@/interfaces/interfaces';


describe('progress bar tests', () => {
    test('should render a progress bar', () => {
        render(<ProgressBar step={0} gameQuiz={[]} />)

        const progressEl: HTMLProgressElement = screen.getByRole('progressbar');

        expect(progressEl).toBeInTheDocument();
    })

    test('should render a value and maxValue according to data', () => {
        const mockData: IQuizSet = {
            question: 'question',
            answer: 0,
            alternatives: ['alternative']
        }
        const step: number = 2;
        const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
        render(<ProgressBar step={step} gameQuiz={mockGameSet} />)

        const progresEl: HTMLProgressElement = screen.getByRole('progressbar');

        expect(progresEl.value).toBe(step);
        expect(progresEl.max).toBe(mockGameSet.length);
    })
})

describe('text/paragraph tests', () => {
    test('should render text with current step and length of the game quiz', () => {
        const mockData: IQuizSet = {
            question: 'question',
            answer: 0,
            alternatives: ['alternative']
        }
        const step: number = 2;
        const mockGameSet: IQuizSet[] = [mockData, mockData, mockData, mockData]
        render(<ProgressBar step={step} gameQuiz={mockGameSet} />)

        const textEl: HTMLElement = screen.getByText(`${2} / ${mockGameSet.length}`)

        expect(textEl).toBeInTheDocument();
        expect(textEl.textContent).toBe(`${step} / ${mockGameSet.length}`)
    })
})
