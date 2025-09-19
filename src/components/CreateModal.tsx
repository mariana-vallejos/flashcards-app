import { useState } from "react";

const CreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  

  const handleSave = () => {
    const newFlashcard = { question, answer };
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
