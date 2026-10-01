import { useEffect, useState } from "react";
import { ExternalLink, Newspaper } from "lucide-react";
import { DashboardLayout } from "../../components/layout";
import { EmptyState } from "../../components/ui";
import { supabase } from "../../lib/supabase";
import type { NewsArticle } from "../../types/models";

const CATEGORIES = [
  "All",
  "Legal",
  "Courts & Judiciary",
  "Crime",
  "Politics",
  "Government",
  "Current Affairs"
];

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await supabase.functions.invoke('fetch-news');
      const { data, error: fnError } = res;
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      if (data?.error) {
        throw new Error(data.error);
      }
      
      const mappedArticles = (data?.articles || []).map((a: any) => ({
        id: a.id,
        category: a.category,
        title: a.title,
        description: a.description,
        imageUrl: a.image_url,
        sourceName: a.source_name,
        sourceUrl: a.source_url,
        publishedAt: a.published_at,
        fetchedAt: a.fetched_at
      }));
      setArticles(mappedArticles);
    } catch (e: any) {
      setError(e.message || "We couldn't load the latest news right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <DashboardLayout role="client">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="eyebrow">Informed decisions</p><h1 className="mt-1 text-3xl font-bold text-ink">LegalSangam News</h1>
          <p className="mt-2 text-slate-500">
            Stay informed about legal, court, crime, government and current affairs developments.
          </p>
        </div>
        <button onClick={fetchNews} disabled={loading} className="btn-outline py-2.5">
          Refresh
        </button>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 mb-6 scrollbar-hide">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === c 
                ? "bg-brand text-white" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="size-12 rounded-full border-4 border-brand/20 border-t-brand animate-spin mb-4"></div>
          <h3 className="text-lg font-semibold text-ink">Loading latest news...</h3>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 text-red-800 p-6 rounded-xl flex flex-col items-center text-center">
          <Newspaper size={32} className="text-red-400 mb-3" />
          <p className="font-medium mb-4">{error}</p>
          <button onClick={fetchNews} className="btn-primary bg-red-600 hover:bg-red-700">Retry</button>
        </div>
      )}

      {!loading && !error && filteredArticles.length === 0 && (
        <EmptyState title="No relevant news found.">
          Try selecting another category or check back later.
        </EmptyState>
      )}

      {!loading && !error && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, i) => (
            <article key={article.id || i} className="card p-0 flex flex-col overflow-hidden group">
              {article.imageUrl ? (
                <div className="w-full h-48 overflow-hidden bg-slate-100 relative">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-brand uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center relative">
                  <Newspaper size={48} className="text-slate-300" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-brand uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
              )}
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center text-xs text-slate-500 mb-3 font-medium">
                  <span className="truncate max-w-[120px]">{article.sourceName}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(article.publishedAt || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                
                <h3 className="text-lg font-bold text-ink mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                  {article.description}
                </p>
                
                <a 
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-blue-800 transition-colors mt-auto"
                >
                  Read Article <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center text-xs text-slate-400">
        News articles are provided from external sources. LegalSangam does not necessarily endorse or verify the views expressed in external articles.
      </div>
    </DashboardLayout>
  );
}
