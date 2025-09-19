import { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal";
import type { Flashcard } from "../types/flashcard";
import FlashcardComponent from "../components/flashcards/Flashcard";

const HomePage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("flashcards") || "[]"
    ) as Flashcard[];
    setFlashcards(stored);
  }, []);

  const addFlashcard = (fc: Flashcard) => {
    const updated = [...flashcards, fc];
    setFlashcards(updated);
    localStorage.setItem("flashcards", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">Study App</h1>
      {flashcards.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No flashcards created yet.
        </p>
      ) : (
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((fc) => (
            <FlashcardComponent {...fc} />
          ))}
        </div>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-amber-600 transition"
        title="Create Flashcard"
      >
        +
      </button>
      <CreateModal
        onAdd={addFlashcard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
