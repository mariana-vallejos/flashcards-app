import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Flashcard, Status } from "../types/flashcard";

type StudyProgress = {
  learned: number;
  toReview: number;
  notReviewed: number;
  lastStudiedAt: Date | null;
};

type FlashcardsContextType = {
  flashcards: Flashcard[];
  studyProgress: StudyProgress;
  addFlashcard: (fc: Flashcard) => void;
  updateFlashcard: (id: number, updated: Partial<Flashcard>) => void;
  deleteFlashcard: (id: number) => void;
  clearAll: () => void;
  updateProgress: () => void;
};

const FlashcardsContext = createContext<FlashcardsContextType | undefined>(
  undefined
);

export const FlashcardsProvider = ({ children }: { children: ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const stored = localStorage.getItem("flashcards");
    return stored ? (JSON.parse(stored) as Flashcard[]) : [];
  });

  const [studyProgress, setStudyProgress] = useState<StudyProgress>(() => {
    const stored = localStorage.getItem("studyProgress");
    return stored
      ? (JSON.parse(stored) as StudyProgress)
      : { learned: 0, toReview: 0, notReviewed: 0, lastStudiedAt: null };
  });

  // save flashcards
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    updateProgress();
  }, [flashcards]);

  // save study progress
  useEffect(() => {
    localStorage.setItem("studyProgress", JSON.stringify(studyProgress));
  }, [studyProgress]);

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
    setStudyProgress({ learned: 0, toReview: 0, notReviewed: 0, lastStudiedAt: null });
  };

  const updateProgress = () => {
    const learned = flashcards.filter((f) => f.status === Status.LEARNED).length;
    const toReview = flashcards.filter((f) => f.status === Status.TO_REVIEW).length;
    const notReviewed = flashcards.filter((f) => f.status === Status.NOT_REVIEWED).length;

    setStudyProgress({
      learned,
      toReview,
      notReviewed,
      lastStudiedAt: new Date(),
    });
  };

  return (
    <FlashcardsContext.Provider
      value={{
        flashcards,
        studyProgress,
        addFlashcard,
        updateFlashcard,
        deleteFlashcard,
        clearAll,
        updateProgress,
      }}
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
