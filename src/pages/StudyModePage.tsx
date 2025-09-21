import { useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import { Status } from "../types/flashcard";
import FlashcardComponent from "../components/flashcards/Flashcard";
import StudyProgressBar from "../components/StudyProgressBar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const StudyModePage = () => {
  const { flashcards, updateFlashcard } = useFlashcards();
  const navigate = useNavigate()

  const [indices, setIndices] = useState<number[]>(flashcards.map((_, i) => i));
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = flashcards.length;
  const current = flashcards[indices[currentIndex]];

  const shuffleIndices = (arr: number[]) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const shuffleFlashcards = () => {
    setIndices(shuffleIndices(indices));
    setCurrentIndex(0);
  };

  const nextCard = () => {
    if (currentIndex < total - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const markAs = (status: Status) => {
    updateFlashcard(current.id, { status });
  };

  return (
    <div className="mx-40 my-10 p-8 rounded-2xl shadow-md relative">
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
        flashcards={flashcards}
        currentIndex={currentIndex}
        total={total}
      />

      <div className="overflow-hidden relative min-h-[270px] w-2/3 mx-auto">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {indices.map((i) => (
            <div key={flashcards[i].id} className="flex-none w-full px-4">
              <FlashcardComponent flashcard={flashcards[i]} />
            </div>
          ))}
        </div>
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
        className="px-8 py-2 rounded disabled:opacity-50 absolute top-1/2 left-0 -translate-y-1/2"
      >
        <MdArrowBackIos size={30} />
      </button>
      <button
        onClick={nextCard}
        disabled={currentIndex === total - 1}
        className="px-8 py-2 rounded disabled:opacity-50 absolute top-1/2 right-0 -translate-y-1/2"
      >
        <MdArrowForwardIos size={30} />
      </button>
    </div>
  );
};

export default StudyModePage;
