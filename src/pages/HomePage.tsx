import { useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import SearchAndFilterBar from "../components/SearchFilterBar";
import CircularProgress from "../components/CircularProgress";
import FlashcardsList from "../components/flashcards/FlashcardsList";
import { formatDateTo_dd_mm_yyyy } from "../utils/formatDate";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { flashcards, studyProgress } = useFlashcards();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const total = flashcards.length;

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
        <div className="h-2/5">
          <CircularProgress total={total} learned={studyProgress.learned} />
        </div>
        <section className="pt-0 md:pt-8 px-6 text-center text-gray-700 font-normal">
          <p className="">{studyProgress.toReview} para repasar</p>
          <p>{studyProgress.notReviewed} sin revisar</p>
          <p className="mb-7">
            Última sesión:{" "}
            {formatDateTo_dd_mm_yyyy(
              studyProgress?.lastStudiedAt || new Date()
            )}
          </p>
          <Link
            to={"/study-mode"}
            className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition"
          >
            Study Mode
          </Link>
        </section>
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
          <FlashcardsList flashcards={filteredFlashcards} />
        )}
      </div>
    </main>
  );
};

export default HomePage;
