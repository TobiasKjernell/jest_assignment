import { screen, render, within, fireEvent, queryByTestId } from '@testing-library/react';
import GameBoard from '.';
import { gameQuiz } from '@/data/data';

test("should render a GameHeader component", () => {
    render(<GameBoard player='' />)

    const gameHeaderEl: HTMLElement = screen.getByRole('banner');

    expect(gameHeaderEl).toBeInTheDocument();
    expect(gameHeaderEl).toBeVisible();
})


test("should render 'ProgressBar' component if not done with quiz", () => {
    render(<GameBoard player={'test user'} />)

    const progressEl: HTMLProgressElement = screen.queryByRole('progressbar') as HTMLProgressElement;

    expect(progressEl).toBeInTheDocument();
    expect(progressEl).toBeVisible();
})

test("should render 'QuizArena' component if not done with quiz", () => {
    render(<GameBoard player={'test user'} />)

    const listItems: HTMLElement[] = screen.getAllByTestId('alternative-item');

    expect(listItems[0]).toBeInTheDocument();
    expect(listItems[0]).toBeVisible();
})

test("should render 'NextBtn' component with text 'Next' if not on last step", () => {
    render(<GameBoard player={'test user'} />)

    const nxtBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })

    expect(nxtBtn).toBeInTheDocument();
    expect(nxtBtn.textContent).toBe('Next');
})

test("should render disabled 'Alternatives' item when one of them is clicked", () => {
    render(<GameBoard player={'test user'} />)

    const listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
    const altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');

    listItems.forEach(item => expect(within(item).getByRole('button')).not.toBeDisabled());
    fireEvent.click(altBtn);
    listItems.forEach(item => expect(within(item).getByRole('button')).toBeDisabled());
})

test("should render disabled 'Alternatives' item and show right result colors", () => {
    render(<GameBoard player={'test user'} />)

    const listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
    const altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');

    listItems.forEach(item => expect(within(item).getByRole('button')).not.toBeDisabled());
    fireEvent.click(altBtn);
    listItems.forEach(item => expect(within(item).getByRole('button')).toBeDisabled());

    listItems.forEach(
        (item, index) => index === gameQuiz[0].answer
            ? expect(item).toHaveClass('correct')
            : expect(item).toHaveClass('wrong')
    )
})

test("should render a button with 'Next' and be enabled when clicking on a 'Alternative' button", () => {
    render(<GameBoard player={'test user'} />)

    const listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
    const altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');
    const nextBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })

    expect(nextBtn).toBeDisabled();
    fireEvent.click(altBtn);
    expect(nextBtn).not.toBeDisabled();
})

test("should render a button with 'See Result' if on last question, button should be disabled", () => {
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

test("should hide 'progress/quiz/nextbtn' when clicking 'See Result' and render Result'", () => {
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

test("should render correct values in result after a full-game.", () => {
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

test("should render a 'new interation' when clicking on 'Play again button' and hides 'Result'", () => {
    render(<GameBoard player={'test user'} />)

    let listItems: HTMLElement[] = screen.queryAllByTestId('alternative-item');
    let altBtn: HTMLButtonElement = within(listItems[0]).getByRole('button');
    let nextBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Next' })
    let progressEl: HTMLProgressElement = screen.queryByRole('progressbar') as HTMLProgressElement;

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

    const playAgainBtn = screen.getByRole('button', { name: 'Play again' })
    fireEvent.click(playAgainBtn);

    listItems = screen.queryAllByTestId('alternative-item');
    nextBtn = screen.getByRole('button', { name: 'Next' })
    progressEl = screen.queryByRole('progressbar') as HTMLProgressElement;
    let questionEl: HTMLElement = screen.getByRole('heading', { level: 3, name: gameQuiz[0].question });

    expect(nextBtn).toBeInTheDocument();
    expect(progressEl).toBeInTheDocument();
    expect(listItems[0]).toBeInTheDocument();
    expect(questionEl.textContent).toBe(gameQuiz[0].question);

})

