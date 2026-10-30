function Navbar({ page, setPage }) {
  return (
    <header className="bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <button
          onClick={() => setPage("news")}
          className="text-xl font-bold text-sky-400"
        >
          News Hub
        </button>

        <nav className="flex gap-2">
          <button
            onClick={() => setPage("news")}
            className={`rounded-lg px-3 py-2 ${
              page === "news"
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Latest News
          </button>

          <button
            onClick={() => setPage("saved")}
            className={`rounded-lg px-3 py-2 ${
              page === "saved"
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Saved News
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
