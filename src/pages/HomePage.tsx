import CreateModal from "../components/CreateModal";
import FlashcardList from "../components/FlashcardsList";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl text-center font-bold">Study App</h1>
      <CreateModal />
      <FlashcardList />
    </div>
  );
};

export default HomePage;
