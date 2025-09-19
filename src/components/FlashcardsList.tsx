import { useEffect, useState } from "react";
import { Status, type Flashcard } from "../types/flashcard";
import { topicColors } from "./CreateModal";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("flashcards") || "[]") as Flashcard[];
    setFlashcards(stored);
  }, []);

  if (flashcards.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No flashcards created yet.</p>;
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((fc) => (
        <div
          key={fc.id}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">{fc.question}</h3>
            <p className="text-gray-700 mb-4">{fc.answer}</p>

            <div className="flex flex-wrap gap-2 mb-2">
              {fc.topics.map((t) => {
                const color = topicColors[t] || { bg: "bg-gray-200", text: "text-gray-700" };
                return (
                  <span key={t} className={`px-2 py-1 rounded-full text-sm ${color.bg} ${color.text}`}>
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          <span
            className={`mt-4 text-sm font-medium ${
              fc.status === Status.LEARNED
                ? "text-green-600"
                : fc.status === Status.TO_REVIEW
                ? "text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {fc.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;
