import { useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import SearchAndFilterBar from "../components/SearchFilterBar";
import CircularProgress from "../components/CircularProgress";
import { Status } from "../types/flashcard";
import FlashcardsList from "../components/flashcards/FlashcardsList";

const HomePage = () => {
  const { flashcards } = useFlashcards();
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
          <FlashcardsList flashcards={filteredFlashcards}/>
        )}
        
      </div>
    </main>
  );
};

export default HomePage;
