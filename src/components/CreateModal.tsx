import { useState } from "react";
import { Status, type Flashcard } from "../types/flashcard";
import { useForm } from "react-hook-form";

const availableTopics = [
  "Math",
  "Science",
  "History",
  "English",
  "Programming",
  "Art",
  "Geography",
];

export const topicColors: Record<string, { bg: string; text: string }> = {
  Math: { bg: "bg-blue-100", text: "text-blue-700" },
  Science: { bg: "bg-green-100", text: "text-green-700" },
  History: { bg: "bg-yellow-100", text: "text-yellow-700" },
  English: { bg: "bg-pink-100", text: "text-pink-700" },
  Programming: { bg: "bg-purple-100", text: "text-purple-700" },
  Art: { bg: "bg-red-100", text: "text-red-700" },
  Geography: { bg: "bg-teal-100", text: "text-teal-700" },
};

type CreateModalProps = {
  onAdd: (fc: Flashcard) => void;
};

interface IDataInput {
  question: string;
  answer: string;
}

const CreateModal = ({ onAdd }: CreateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDataInput>();

  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const onSubmit = (data: IDataInput) => {
    const newFlashcard: Flashcard = {
      id: generateId(),
      question: data.question,
      answer: data.answer,
      topics: selectedTopics,
      status: Status.NOT_REVIEWED,
    };

    const storedFlashcards =
      JSON.parse(localStorage.getItem("flashcards") || "[]") as Flashcard[];
    localStorage.setItem(
      "flashcards",
      JSON.stringify([...storedFlashcards, newFlashcard])
    );

    onAdd(newFlashcard);
    reset();
    setSelectedTopics([]);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-amber-600 transition"
        title="Create Flashcard"
      >
        +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 relative shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Flashcard</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  {...register("question", { required: true, minLength: 5 })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    errors.question ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">
                    Question must be at least 5 characters.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Answer</label>
                <textarea
                  {...register("answer", { required: true, minLength: 10 })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    errors.answer ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1">
                    Answer must be at least 10 characters.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Topics</label>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map((topic) => {
                    const selected = selectedTopics.includes(topic);
                    const color = topicColors[topic] || {
                      bg: "bg-gray-200",
                      text: "text-gray-700",
                    };

                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-1 rounded-full border transition ${
                          selected
                            ? `${color.bg} ${color.text} border-transparent`
                            : "bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTopics.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-1">Selected Topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTopics.map((t) => {
                      const color = topicColors[t] || {
                        bg: "bg-gray-200",
                        text: "text-gray-700",
                      };
                      return (
                        <span
                          key={t}
                          className={`px-2 py-1 rounded-full flex items-center gap-1 ${color.bg} ${color.text}`}
                        >
                          {t}
                          <button onClick={() => toggleTopic(t)}>×</button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                    setSelectedTopics([]);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
