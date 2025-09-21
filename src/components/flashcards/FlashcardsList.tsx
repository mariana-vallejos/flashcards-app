import { useState } from "react";
import CreateEditModal from "../CreateEditModal";
import DeleteModal from "../DeleteModal";
import FlashcardComponent from "./Flashcard";
import { useFlashcards } from "../../context/FlashcardsContext";
import type { Flashcard } from "../../types/flashcard";

type FlashcardsListProps = {
  flashcards: Flashcard[];
};

const FlashcardsList = ({ flashcards }: FlashcardsListProps) => {
  const { deleteFlashcard } = useFlashcards();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState<number | null>();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (id: number) => {
    setSelectedFlashcard(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteFlashcard(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <section className="px-8 pb-8 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((fc) => (
        <FlashcardComponent
          flashcard={fc}
          onEdit={() => handleEdit(fc.id)}
          onDelete={handleDelete}
          key={fc.id}
        />
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-purple-600 transition"
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

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default FlashcardsList;
