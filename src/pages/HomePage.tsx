import { useState } from "react";
import CreateEditModal from "../components/CreateEditModal";
import FlashcardComponent from "../components/flashcards/Flashcard";
import { useFlashcards } from "../context/FlashcardsContext";

const HomePage = () => {
  const { flashcards } = useFlashcards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState<number | null>();

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
            <FlashcardComponent
              flashcard={fc}
              onEdit={() => {
                setIsModalOpen(true);
                setSelectedFlashcard(fc.id);
              }}
              key={fc.id}
            />
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
      <CreateEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFlashcard(null);
        }}
        flashcardId={selectedFlashcard ?? undefined}
      />
    </div>
  );
};

export default HomePage;
