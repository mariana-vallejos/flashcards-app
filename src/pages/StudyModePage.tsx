import { useEffect, useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import { Status, type Flashcard } from "../types/flashcard";
import FlashcardComponent from "../components/flashcards/Flashcard";
import StudyProgressBar from "../components/StudyProgressBar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const StudyModePage = () => {
  const { flashcards, updateFlashcard } = useFlashcards();
  const [studyOrder, setStudyOrder] = useState<Flashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const total = studyOrder.length;
  const current = studyOrder[currentIndex];

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shuffleFlashcards = () => {
    const shuffled = shuffleArray(studyOrder);
    setStudyOrder(shuffled);
    setCurrentIndex(0);
  };

  const nextCard = () => {
    if (currentIndex < total - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const markAs = (status: Status) => {
    updateFlashcard(current.id, { ...current, status });
  };

  useEffect(() => {
    setStudyOrder(flashcards);
  }, [flashcards]);

  return (
    <div className="mx-40 my-10 p-6 rounded-2xl shadow-md relative">
      <div className="flex justify-between mb-4">
        <button
          className="flex text-gray-600 items-center gap-2 hover:border-b-[1px]"
          onClick={() => navigate("/")}
        >
          <IoMdArrowBack />
          End session
        </button>
        <button
          onClick={shuffleFlashcards}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Shuffle Flashcards
        </button>
      </div>

      <StudyProgressBar
        flashcards={studyOrder}
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
