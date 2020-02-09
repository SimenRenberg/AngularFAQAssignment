export class QuestionsAndAnswers {
    id: number;
    category: string;
    question: string;
    answer: string;
    tommelOpp: number;
    tommelNed: number;
}

export interface IQuestionsAndAnswers {
    id: number;
    category: string;
    question: string;
    answer: string;
    tommelOpp: number;
    tommelNed: number;
}
