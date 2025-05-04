import React, { useState, useEffect } from 'react';
import { getNews } from '../services/newsApi';
import { Article } from '../types/news';
import { Loader2 } from 'lucide-react';

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await getNews();
        setArticles(res.articles);
      } catch (err) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Latest Health News</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <a
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                  <p className="text-xs text-gray-400">{new Date(article.publishedAt).toLocaleString()}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News; 