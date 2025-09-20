import { useState } from "react";
import CreateEditModal from "../components/CreateEditModal";
import FlashcardComponent from "../components/flashcards/Flashcard";
import { useFlashcards } from "../context/FlashcardsContext";
import DeleteModal from "../components/DeleteModal";
import SearchAndFilterBar from "../components/SearchFilterBar";
import CircularProgress from "../components/CircularProgress";
import { Status } from "../types/flashcard";

const HomePage = () => {
  const { flashcards, deleteFlashcard } = useFlashcards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState<number | null>();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const total = flashcards.length;
  const learned = flashcards.filter((f) => f.status === Status.LEARNED).length;

  const filteredFlashcards = flashcards.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTopic = selectedTopic
      ? f.topics.includes(selectedTopic)
      : true;

    return matchesSearch && matchesTopic;
  });

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
    <main className="p-4 md:flex h-screen">
      <div className="md:w-1/4">
        <h1 className="text-4xl text-center font-bold py-3">Study App</h1>
        <CircularProgress total={total} learned={learned} />
      </div>
      <div className="md:w-3/4">
        <div className="">
          <SearchAndFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        </div>

        {filteredFlashcards.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No flashcards.</p>
        ) : (
          <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlashcards.map((fc) => (
              <FlashcardComponent
                flashcard={fc}
                onEdit={() => handleEdit(fc.id)}
                onDelete={handleDelete}
                key={fc.id}
              />
            ))}
          </section>
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

        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </main>
  );
};

export default HomePage;
