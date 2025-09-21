import type { Flashcard } from "../types/flashcard";

type StudyProgressBarProps = {
  currentIndex: number;
  total: number;
  flashcards: Flashcard[];
};

const StudyProgressBar = ({ currentIndex, total, flashcards }: StudyProgressBarProps) => {
  if (total === 0) return null;

  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <>
      <div className="flex gap-1 mb-3">
        {flashcards.map((fc, idx) => (
          <div
            key={fc.id}
            className={`h-3 flex-1 rounded-sm ${
              idx < currentIndex
                ? "bg-blue-500"
                : idx === currentIndex
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>
          Card {currentIndex + 1} / {total}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
    </>
  );
};

export default StudyProgressBar;
