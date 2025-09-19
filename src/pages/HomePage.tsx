import { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal";
import type { Flashcard } from "../types/flashcard";
import FlashcardComponent from "../components/Flashcard";

const HomePage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("flashcards") || "[]") as Flashcard[];
    setFlashcards(stored);
  }, []);

  const addFlashcard = (fc: Flashcard) => {
    const updated = [...flashcards, fc];
    setFlashcards(updated);
    localStorage.setItem("flashcards", JSON.stringify(updated));
  };

  if (flashcards.length === 0) {
    return ;
  }

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">Study App</h1>
      {flashcards .length === 0 ? <p className="text-center text-gray-500 mt-10">No flashcards created yet.</p>: 
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((fc) => (
        <FlashcardComponent {...fc}/>
      ))}</div>
      }
      <CreateModal onAdd={addFlashcard}/>
    </div>
  );
};

export default HomePage;
