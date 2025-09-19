import { useState } from "react";
// can a flashcard have more than one topic?
// can a status be "not reviewed"?
// how to manage create edit modal?
// can it be created more topics or just predefined?

const availableTopics = [
  "Math",
  "Science",
  "History",
  "English",
  "Programming",
  "Art",
  "Geography",
];

const topicColors: Record<string, { bg: string; text: string }> = {
  Math: { bg: "bg-blue-100", text: "text-blue-700" },
  Science: { bg: "bg-green-100", text: "text-green-700" },
  History: { bg: "bg-yellow-100", text: "text-yellow-700" },
  English: { bg: "bg-pink-100", text: "text-pink-700" },
  Programming: { bg: "bg-purple-100", text: "text-purple-700" },
  Art: { bg: "bg-red-100", text: "text-red-700" },
  Geography: { bg: "bg-teal-100", text: "text-teal-700" },
};

const CreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSave = () => {
    const newFlashcard = { question, answer, topics: selectedTopics };
    // TO DO: guardar en local storage
    console.log("New flashcard:", newFlashcard);
    setQuestion("");
    setAnswer("");
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

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Answer</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
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

            {/* Topics seleccionados */}
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
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
