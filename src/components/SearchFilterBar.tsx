import { availableTopics } from "../types/topics";

type SearchAndFilterBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedTopic: string | null;
  setSelectedTopic: (value: string | null) => void;
};

const SearchAndFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedTopic,
  setSelectedTopic,
}: SearchAndFilterBarProps) => {
  const handleClear = () => {
    setSearchTerm("");
    setSelectedTopic(null);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 w-full px-9 pt-5">
      <select
        value={selectedTopic || ""}
        onChange={(e) => setSelectedTopic(e.target.value || null)}
        className="border px-4 bg-white border-purple-50 shadow-md shadow-blue-200  py-2 rounded-md w-full lg:w-1/5 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">All topics</option>
        {availableTopics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by question or answer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white border border-purple-50 shadow-md shadow-blue-200 px-4 py-2 rounded-md w-full lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {(searchTerm || selectedTopic) && (
        <button
          onClick={handleClear}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Clear search
        </button>
      )}
    </div>
  );
};

export default SearchAndFilterBar;
