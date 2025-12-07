import {
  FilteredTask,
  HistorySection,
  HistoryTask,
} from '../entities/interface';

interface AnswersObj {
  text: string;
  isCorrect: boolean;
}

export const filterHistoryData = (data: HistorySection[]): FilteredTask[] => {
  return data.flatMap((section: HistorySection) =>
    section.tasks.map((task: HistoryTask) => {
      const answers: AnswersObj[] = task.answers.map((elem) => ({
        text: elem.text,
        isCorrect: task.correct_answer.includes(elem.answer),
      }));

      return {
        topic: task.topic,
        question: task.question,
        answers,
      };
    }),
  );
};
