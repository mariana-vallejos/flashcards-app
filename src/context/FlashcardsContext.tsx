import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Flashcard } from "../types/flashcard";

type FlashcardsContextType = {
  flashcards: Flashcard[];
  addFlashcard: (fc: Flashcard) => void;
  updateFlashcard: (id: number, updated: Partial<Flashcard>) => void;
  deleteFlashcard: (id: number) => void;
  clearAll: () => void;
};

const FlashcardsContext = createContext<FlashcardsContextType | undefined>(undefined);

export const FlashcardsProvider = ({ children }: { children: ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("flashcards") || "[]") as Flashcard[];
    setFlashcards(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  const addFlashcard = (fc: Flashcard) => {
    setFlashcards((prev) => [...prev, fc]);
  };

  const updateFlashcard = (id: number, updated: Partial<Flashcard>) => {
    setFlashcards((prev) =>
      prev.map((fc) => (fc.id === id ? { ...fc, ...updated } : fc))
    );
  };

  const deleteFlashcard = (id: number) => {
    setFlashcards((prev) => prev.filter((fc) => fc.id !== id));
  };

  const clearAll = () => {
    setFlashcards([]);
  };

  return (
    <FlashcardsContext.Provider
      value={{ flashcards, addFlashcard, updateFlashcard, deleteFlashcard, clearAll }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export const useFlashcards = () => {
  const ctx = useContext(FlashcardsContext);
  if (!ctx) {
    throw new Error("useFlashcards must be used inside a FlashcardsProvider");
  }
  return ctx;
};
