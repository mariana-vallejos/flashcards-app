import { AiOutlineDelete } from "react-icons/ai";
import { Status, type Flashcard } from "../../types/flashcard";
import { topicColors } from "../../types/topics";
import "./Flashcard.css";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
  flashcard: Flashcard;
  onEdit?: (fc: Flashcard) => void;
  onDelete?: (id: number) => void;
};

const FlashcardComponent = (flashcard : Flashcard) => {
  return (
    <article className="relative bg-white flashcard-bg rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition group">
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => {}}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          title="Editar"
        >
          <MdOutlineEdit />
        </button>
        <button
          onClick={() => {}}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          title="Eliminar"
        >
          <AiOutlineDelete />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-2 border-gray-800 border-[1.5px] rounded-sm h-30 flex items-center justify-center">
        <h3 className="text-xl font-semibold mx-2">{flashcard.question}</h3>
      </div>

      <div className="mt-4 flex items-center gap-3 justify-between">
        <span
          className={`text-sm font-medium ${
            flashcard.status === Status.LEARNED
              ? "text-green-600"
              : flashcard.status === Status.TO_REVIEW
              ? "text-yellow-600"
              : "text-gray-500"
          }`}
        >
          {flashcard.status}
        </span>
        <div className="flex flex-wrap gap-2">
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
    </article>
  );
};

export default FlashcardComponent;
