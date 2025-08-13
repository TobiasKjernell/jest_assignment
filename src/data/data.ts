import { IQuizSet } from "@/interfaces/interfaces";

const firstRoundQuizSet: IQuizSet = {
    question: "What is the most common 'Coffee bean' type?",
    answer: 2,
    alternatives: ['Excelsa', 'Liberica', 'Arabica', 'Robusta']
}

const secondRoundQuizSet: IQuizSet = {
    question: "Which country consumes most coffee per capita",
    answer: 3,
    alternatives: ['Canada', 'Netherlands', 'USA', 'Finland']
}

const thirdRoundQuizSet: IQuizSet = {
    question: "Which country produces most coffee? ",
    answer: 2,
    alternatives: ['Colombia', 'Uganda', 'Brazil', 'Vietnam']
}

const fourthRoundQuizSet: IQuizSet = {
    question: "Coffee beans aren't actually beans. What is it?",
    answer: 1,
    alternatives: ['A cherry', 'A seed from a cherry', 'A berry  ', 'Fermented panda']
}

const fifthRoundQuizSet: IQuizSet = {
    question: "Coffee, in moderation, can offer several health benefits due to its caffeine and antioxidant content.",
    answer: 0,
    alternatives: ["It may lower the risk of type 2 diabetes, Parkinson's disease, liver disease, and certain cancers!", 'It may lower the risk of heart attack, flu, headache and cramps!', "It may lower the risk of stroke, Alzheimer's disease, nephrosis, heart diseases!", "It may lower the risk of acne, Addison's disease, cystic fibrosis and epilepsy!"]
}


export const gameQuiz:IQuizSet[] = [firstRoundQuizSet, secondRoundQuizSet, thirdRoundQuizSet, fourthRoundQuizSet, fifthRoundQuizSet];