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
    <main className="p-6 lg:p-10 md:flex h-screen w-full gap-8">
      <div className="lg:w-1/5 bg-white rounded-md shadow-xl">
        <h1 className="text-4xl text-center font-bold py-3 lg:mt-5">Study App</h1>
        <div className="h-[250px]">
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
            className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            Study Mode
          </Link>
        </section>
      </div>
      <div className="md:w-4/5 border-[3.5px] border-stone-300 border-dashed h-fit">
        <div className="">
          <SearchAndFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        </div>
        <hr className="my-4 border-gray-300 border-2 border-dashed mx-6"/>
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
