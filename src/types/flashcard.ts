export enum Status {
    LEARNED = "Learned",
    TO_REVIEW = "Need Revision",
    NOT_REVIEWED = "Not reviewed"
}

export type Flashcard = {
    id: number
    question: string
    answer: string
    topics: string[]
    status: Status
}