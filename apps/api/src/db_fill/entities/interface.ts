export type History = HistorySection[];

export interface HistorySection {
    link: string;
    num_tasks: number;
    tasks: HistoryTask[];
    test_id: string
}

export interface HistoryTask {
    task_id: number;
    question: string;
    answers: HistoryAnswer[];
    answer_vheader: string[] | null;
    correct_answer: string[];
    topic: string;
    answer_hheader?: string[] | null;
    with_photo?: boolean;
    photo_url?: string | null;
}

export interface HistoryAnswer {
    answer: string;
    text: string
}

export interface FilteredAnswer {
    text: string;
    isCorrect: boolean;
}

export interface FilteredTask {
    topic: string;
    question: string;
    answers: FilteredAnswer[];
}

export interface HistoryTopic {
    id: string;
    subject_id: string;
    name: string;
}

export interface FlashcardAnswer {
    id: string;
    flashcard_id: string;
    isCorrect: boolean;
    text: string;
    Flashcard: FilteredTask
}