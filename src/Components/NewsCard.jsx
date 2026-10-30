function NewsCard({ article, liked, saved, onLike, onSave }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      )}

      <div className="p-5">
        <p className="mb-2 text-sm text-sky-600">
          {article.source?.name || "News source"}
        </p>

        <h2 className="mb-3 text-lg font-bold text-slate-900">
          {article.title}
        </h2>

        <p className="mb-4 text-sm leading-6 text-slate-600">
          {article.description || "No description available."}
        </p>

        <p className="mb-4 text-xs text-slate-500">
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleString()
            : ""}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onLike(article)}
            className={`rounded-lg px-3 py-2 text-sm ${
              liked
                ? "bg-rose-100 text-rose-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {liked ? "♥ Liked" : "♡ Like"}
          </button>

          <button
            onClick={() => onSave(article)}
            className={`rounded-lg px-3 py-2 text-sm ${
              saved
                ? "bg-amber-100 text-amber-800"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {saved ? "✓ Saved" : "＋ Save"}
          </button>

          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Read article ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
