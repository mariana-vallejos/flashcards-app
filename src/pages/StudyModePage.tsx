import { useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import { Status } from "../types/flashcard";
import FlashcardComponent from "../components/flashcards/Flashcard";
import StudyProgressBar from "../components/StudyProgressBar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const StudyModePage = () => {
  const { flashcards, updateFlashcard } = useFlashcards();
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = flashcards.length;
  const current = flashcards[currentIndex];

  const nextCard = () => {
    if (currentIndex < total - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const markAs = (status: Status) => {
    updateFlashcard(current.id, {
      ...current,
      status: status,
    });
  };

  return (
    <div className="mx-40 my-10 p-6 rounded-2xl shadow-md relative">
      <StudyProgressBar
        flashcards={flashcards}
        currentIndex={currentIndex}
        total={total}
      />

      <div className="p-6 min-h-[120px] max-w-2/3 mx-auto">
        <FlashcardComponent flashcard={current} />
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => markAs(Status.LEARNED)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Mark as Learned
        </button>
        <button
          onClick={() => markAs(Status.TO_REVIEW)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Need Revision
        </button>
      </div>

      <button
        onClick={prevCard}
        disabled={currentIndex === 0}
        className="px-4 py-2 rounded disabled:opacity-50 absolute top-1/2"
      >
        <MdArrowBackIos size={30} />
      </button>
      <button
        onClick={nextCard}
        disabled={currentIndex === total - 1}
        className="px-4 py-2 rounded disabled:opacity-50 absolute top-1/2 right-2"
      >
        <MdArrowForwardIos size={30} />
      </button>
    </div>
  );
};

export default StudyModePage;
