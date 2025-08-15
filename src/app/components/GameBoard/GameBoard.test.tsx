import { screen, render, within, fireEvent, queryByTestId } from '@testing-library/react';
import GameBoard from '.';
import { gameQuiz } from '@/data/data';

test("should render a GameHeader component", () => {

    render(<GameBoard player='' />)

    const gameHeaderEl: HTMLElement = screen.getByRole('banner');

    expect(gameHeaderEl).toBeInTheDocument();
    expect(gameHeaderEl).toBeVisible();

})

describe('Components checks / integrations', () => {

    test("should render 'ProgressBar' component if not done with quiz", () => {
        render(<GameBoard player={'test user'} />)

        const progressEl: HTMLProgressElement = screen.queryByRole('progressbar') as HTMLProgressElement;

        expect(progressEl).toBeInTheDocument();
        expect(progressEl).toBeVisible();
    })

    test("should render 'QuizArena' component if not done with quiz", () => {
        render(<GameBoard player={'test user'} />)

        const listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');

        expect(listItems[0]).toBeInTheDocument();
        expect(listItems[0]).toBeVisible();
    })

    test("should render 'NextBtn' component with text 'Next' if not on last step", () => {
        render(<GameBoard player={'test user'} />)

        const nxtBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })

        expect(nxtBtn).toBeInTheDocument();
        expect(nxtBtn.textContent).toBe('Next');
    })

    test("click on a 'alternative' button should disable all alternatives buttons", () => {
        render(<GameBoard player={'test user'} />)

        const listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
        const altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');

        listItems.forEach(item => expect(within(item).getByRole('button')).not.toBeDisabled());
        fireEvent.click(altBtn);
        listItems.forEach(item => expect(within(item).getByRole('button')).toBeDisabled());
    })

    test("click on a 'alternative' button should enable 'Next' button", () => {
        render(<GameBoard player={'test user'} />)

        const listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
        const altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');
        const nextBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })

        expect(nextBtn).toBeDisabled();
        fireEvent.click(altBtn);
        expect(nextBtn).not.toBeDisabled();
    })

    test("Next button should change from 'Next' to 'See Result' on last step and be disabled", () => {
        render(<GameBoard player={'test user'} />)

        let listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
        let altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');
        const nextBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })

        Array.from({ length: gameQuiz.length - 1 }).forEach(() => {
            listItems = screen.queryAllByTestId('alternative-item');
            altBtn = within(listItems[0]).getByRole('button');
            fireEvent.click(altBtn);
            fireEvent.click(nextBtn);
        })

        expect(nextBtn.textContent).toBe('See result');
        expect(nextBtn).toBeDisabled();

    })

    test("When clicking 'See Result button' it should hide 'progress/quiz/nextbtn' and show 'Result' component", () => {
        render(<GameBoard player={'test user'} />)

        let listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
        let altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');
        const nextBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })
        const progressEl: HTMLProgressElement = screen.queryByRole('progressbar') as HTMLProgressElement;

        Array.from({ length: gameQuiz.length }).forEach(() => {
            listItems = screen.queryAllByTestId('alternative-item');
            altBtn = within(listItems[0]).getByRole('button');
            fireEvent.click(altBtn);
            fireEvent.click(nextBtn);
        })

        expect(nextBtn.textContent).toBe('See result');
        fireEvent.click(nextBtn);
        expect(nextBtn).not.toBeInTheDocument();
        expect(progressEl).not.toBeInTheDocument();
        expect(listItems[0]).not.toBeInTheDocument();

        const resultEl = screen.queryByTestId('result') as HTMLElement;
        expect(resultEl).toBeInTheDocument();
        expect(resultEl).toBeVisible();

    })

    test("Result should show correct result values", () => {
        render(<GameBoard player={'test user'} />)

        let listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
        let altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');
        const nextBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })
        const progressEl: HTMLProgressElement = screen.queryByRole('progressbar') as HTMLProgressElement;

        Array.from({ length: gameQuiz.length }).forEach(() => {
            listItems = screen.queryAllByTestId('alternative-item');
            altBtn = within(listItems[0]).getByRole('button');
            fireEvent.click(altBtn);
            fireEvent.click(nextBtn);
        })

        expect(nextBtn.textContent).toBe('See result');
        fireEvent.click(nextBtn);
        expect(nextBtn).not.toBeInTheDocument();
        expect(progressEl).not.toBeInTheDocument();
        expect(listItems[0]).not.toBeInTheDocument();

        const resultEl = screen.queryByTestId('result') as HTMLElement;
        expect(resultEl).toBeInTheDocument();
        expect(resultEl).toBeVisible();
        expect(within(resultEl).getByText('1 of 5 right answers!')).toBeInTheDocument();

    })

})