import { Status, type Flashcard } from "../types/flashcard";
import { topicColors } from "../types/topics";

const FlashcardComponent = (flashcard: Flashcard) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-xl font-semibold mb-2">{flashcard.question}</h3>
        <p className="text-gray-700 mb-4">{flashcard.answer}</p>

        <div className="flex flex-wrap gap-2 mb-2">
          {flashcard.topics.map((t) => {
            const color = topicColors[t] || {
              bg: "bg-gray-200",
              text: "text-gray-700",
            };
            return (
              <span
                key={t}
                className={`px-2 py-1 rounded-full text-sm ${color.bg} ${color.text}`}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>

      <span
        className={`mt-4 text-sm font-medium ${
          flashcard.status === Status.LEARNED
            ? "text-green-600"
            : flashcard.status === Status.TO_REVIEW
            ? "text-yellow-600"
            : "text-gray-500"
        }`}
      >
        {flashcard.status}
      </span>
    </div>
  );
};

export default FlashcardComponent;
