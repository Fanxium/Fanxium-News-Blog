import { useEffect, useState } from "react";
import { fetchTopHeadlines, searchNews } from "../Api/newsApi";
import Navbar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import NewsCard from "../Components/NewsCard";

const categories = [
  { label: "Top News", category: "general" },
  { label: "Nigeria", category: "nation", country: "ng" },
  { label: "International", category: "world" },
  { label: "Entertainment", category: "entertainment" },
  { label: "Sports", category: "sports" },
  { label: "Tech News", category: "technology" },
  { label: "Student Opportunities", category: "opportunities" },
];

function Home() {
  const [page, setPage] = useState("news");
  const [category, setCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [likedArticles, setLikedArticles] = useState(() => {
    return JSON.parse(localStorage.getItem("news-liked") || "[]");
  });

  const [savedArticles, setSavedArticles] = useState(() => {
    return JSON.parse(localStorage.getItem("news-saved") || "[]");
  });

  // Fetch articles whenever the category or submitted search changes
  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError("");

      try {
        let data;

        if (searchQuery) {
          data = await searchNews(searchQuery);
        } else if (category.category === "opportunities") {
          data = await searchNews(
            "scholarship OR internship OR fellowship OR student",
          );
        } else {
          data = await fetchTopHeadlines(category.category, category.country);
        }

        setArticles(data);
      } catch (err) {
        console.error("News request failed:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load news. Check your internet connection and Reload ",
        );
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [category, searchQuery]);

  function handleSearch(query) {
    setSearchQuery(query);
    setPage("news");
  }

  function handleCategoryChange(item) {
    setCategory(item);
    setSearchQuery("");
    setPage("news");
  }

  function toggleLike(article) {
    const articleUrl = article.url;
    let updatedLikes;

    if (likedArticles.includes(articleUrl)) {
      updatedLikes = likedArticles.filter((url) => url !== articleUrl);
    } else {
      updatedLikes = [...likedArticles, articleUrl];
    }

    setLikedArticles(updatedLikes);
    localStorage.setItem("news-liked", JSON.stringify(updatedLikes));
  }

  function toggleSave(article) {
    let updatedSaved;

    const alreadySaved = savedArticles.some((item) => item.url === article.url);

    if (alreadySaved) {
      updatedSaved = savedArticles.filter((item) => item.url !== article.url);
    } else {
      updatedSaved = [...savedArticles, article];
    }

    setSavedArticles(updatedSaved);
    localStorage.setItem("news-saved", JSON.stringify(updatedSaved));
  }

  const displayedArticles = page === "saved" ? savedArticles : articles;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar page={page} setPage={setPage} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-8 rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-400">
            Your daily information source
          </p>

          <h1 className="mb-3 text-3xl font-bold sm:text-5xl">
            Stay informed. Stay ahead.
          </h1>

          <p className="mb-6 max-w-2xl text-slate-300">
            Discover news, technology updates, sports, entertainment, and
            opportunities for students.
          </p>

          <SearchBar onSearch={handleSearch} />
        </section>

        {page === "news" && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Explore categories
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item.category}
                  onClick={() => handleCategoryChange(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    category.category === item.category && !searchQuery
                      ? "bg-sky-500 text-white"
                      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-sky-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {page === "saved"
                ? "Your Saved News"
                : searchQuery
                  ? `Search results: ${searchQuery}`
                  : category.label}
            </h2>

            <span className="text-sm text-slate-500">
              {displayedArticles.length} articles
            </span>
          </div>

          {page === "news" && loading && (
            <p className="py-10 text-center text-slate-600">Loading news...</p>
          )}

          {page === "news" && error && !loading && (
            <p className="rounded-xl bg-rose-50 p-4 text-rose-700">{error}</p>
          )}

          {!loading && !error && displayedArticles.length === 0 && (
            <p className="rounded-xl bg-white p-8 text-center text-slate-600">
              {page === "saved"
                ? "You have not saved any articles yet."
                : "No articles found. Try another search or category."}
            </p>
          )}

          {!(page === "news" && loading) &&
            !(page === "news" && error) &&
            displayedArticles.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedArticles.map((article) => (
                  <NewsCard
                    key={article.url}
                    article={article}
                    liked={likedArticles.includes(article.url)}
                    saved={savedArticles.some(
                      (item) => item.url === article.url,
                    )}
                    onLike={toggleLike}
                    onSave={toggleSave}
                  />
                ))}
              </div>
            )}
        </section>
      </main>

      <footer className="mt-12 bg-slate-950 px-4 py-6 text-center text-sm text-slate-400">
        News Hub · Stay informed, every day.
      </footer>
    </div>
  );
}

export default Home;
