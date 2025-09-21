import { useEffect, useState } from "react";
import { Status, type Flashcard } from "../types/flashcard";
import { useForm } from "react-hook-form";
import { availableTopics, topicColors } from "../types/topics";
import { useFlashcards } from "../context/FlashcardsContext";

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  flashcardId?: number | null;
};

interface IDataInput {
  question: string;
  answer: string;
}

const CreateEditModal = ({
  isOpen,
  onClose,
  flashcardId,
}: CreateModalProps) => {
  const { flashcards, addFlashcard, updateFlashcard } = useFlashcards();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IDataInput>();
  const [topicError, setTopicError] = useState<string | null>(null);

  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const onSubmit = (data: IDataInput) => {
    if (selectedTopics.length === 0) {
      setTopicError("Please select at least one topic.");
      return;
    }
    setTopicError(null);

    if (flashcardId) {
      updateFlashcard(flashcardId, {
        ...data,
        topics: selectedTopics,
      });
    } else {
      const newFlashcard: Flashcard = {
        id: generateId(),
        question: data.question,
        answer: data.answer,
        topics: selectedTopics,
        status: Status.NOT_REVIEWED,
      };
      addFlashcard(newFlashcard);
    }

    reset();
    setSelectedTopics([]);
    onClose();
  };

  useEffect(() => {
    if (flashcardId) {
      const cardToEdit = flashcards.find((f) => f.id === flashcardId);
      if (cardToEdit) {
        setValue("question", cardToEdit.question);
        setValue("answer", cardToEdit.answer);
        setSelectedTopics(cardToEdit.topics || []);
      }
    } else {
      reset();
      setSelectedTopics([]);
    }
  }, [flashcardId, flashcards, setValue, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-1/3 p-6 relative shadow-lg">
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
                    onClick={() => {toggleTopic(topic)
                      setTopicError(null)
                    }}
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
            {topicError && (
              <p className="text-red-500 text-sm mt-1">{topicError}</p>
            )}
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
              onClick={(e) => {
                onClose();
                reset();
                setSelectedTopics([]);
                setTopicError(null)
                e.stopPropagation();
              }}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition"
            >
              {flashcardId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditModal;
