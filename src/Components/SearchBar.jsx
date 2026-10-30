import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const searchText = query.trim();

    if (searchText) {
      onSearch(searchText);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search news, sports, scholarships..."
        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500"
      />

      <button
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white hover:bg-sky-600"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
