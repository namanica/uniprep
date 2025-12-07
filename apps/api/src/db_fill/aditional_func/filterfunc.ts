import { History, HistorySection, HistoryTask } from '../entities/interface';

export const extractTopicsFromHistory = (historyData: History): string[] => {
  const topics = historyData.flatMap((section: HistorySection) =>
    section.tasks
      .map((task: HistoryTask) => task.topic)
      .filter((topic) => topic && typeof topic === 'string'),
  );

  return [...new Set(topics)];
};
