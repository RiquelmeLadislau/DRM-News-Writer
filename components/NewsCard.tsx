import React, { useState } from 'react';
import { GeneratedNews } from '../types';
import { IconCopy, IconCheck } from './Icons';

interface NewsCardProps {
  news: GeneratedNews;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${news.headline}\n\n${news.subtitle}\n\n${news.body}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden animate-fade-in">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Gerado por IA
            </span>
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                title="Copiar texto"
            >
                {copied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
            </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">
          {news.headline}
        </h1>
        <h2 className="text-lg md:text-xl text-slate-600 mb-8 font-light italic leading-relaxed border-l-4 border-blue-500 pl-4">
          {news.subtitle}
        </h2>

        <div className="prose prose-slate max-w-none font-serif text-slate-800">
          {news.body.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {news.keywords.map((tag, idx) => (
              <span key={idx} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-400">
            Tempo de leitura: {news.readingTimeMinutes} min • Gerado em: {new Date(news.date).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;