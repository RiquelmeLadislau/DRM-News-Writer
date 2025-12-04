import React, { useState } from 'react';
import { NEWS_STYLES, NEWS_TONES, APP_NAME } from './constants';
import { NewsStyle, NewsTone, GeneratedNews, UserState } from './types';
import { generateNewsArticle } from './services/geminiService';
import NewsCard from './components/NewsCard';
import Pricing from './components/Pricing';
import { IconNewspaper, IconZap, IconHistory, IconPenTool, IconLoader } from './components/Icons';

function App() {
  const [userState, setUserState] = useState<UserState>({
    credits: 10, // Initial free credits
    history: [],
    plan: 'Starter'
  });

  const [view, setView] = useState<'generator' | 'pricing' | 'history'>('generator');
  
  // Form State
  const [topic, setTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<NewsStyle>(NewsStyle.URGENT);
  const [selectedTone, setSelectedTone] = useState<NewsTone>(NewsTone.OBJECTIVE);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentNews, setCurrentNews] = useState<GeneratedNews | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    if (userState.credits <= 0) {
      setView('pricing');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCurrentNews(null);

    try {
      const news = await generateNewsArticle(topic, selectedStyle, selectedTone);
      
      setUserState(prev => ({
        ...prev,
        credits: prev.credits - 1,
        history: [news, ...prev.history]
      }));
      setCurrentNews(news);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addCredits = (amount: number) => {
    setUserState(prev => ({ ...prev, credits: prev.credits + amount }));
    setView('generator');
    alert(`Sucesso! ${amount} créditos adicionados à sua conta.`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('generator')}>
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <IconNewspaper className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">{APP_NAME}</span>
          </div>

          <nav className="flex items-center gap-2 md:gap-6">
            <button 
              onClick={() => setView('generator')}
              className={`text-sm font-medium transition-colors ${view === 'generator' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setView('history')}
              className={`text-sm font-medium transition-colors ${view === 'history' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Histórico
            </button>
            <button 
              onClick={() => setView('pricing')}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <IconZap className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{userState.credits} Créditos</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Generator View */}
          {view === 'generator' && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar / Controls */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <IconPenTool className="w-5 h-5 text-blue-500" />
                    Configuração da Pauta
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Tópico ou Fato</label>
                      <textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ex: Lançamento do novo iPhone com corpo de titânio..."
                        className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Estilo Editorial</label>
                      <select
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value as NewsStyle)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {NEWS_STYLES.map(style => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Tom de Voz</label>
                      <select
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value as NewsTone)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {NEWS_TONES.map(tone => (
                          <option key={tone} value={tone}>{tone}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !topic.trim()}
                      className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2
                        ${isGenerating || !topic.trim() 
                          ? 'bg-slate-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-95'}`}
                    >
                      {isGenerating ? (
                        <>
                          <IconLoader className="w-5 h-5 animate-spin" />
                          Escrevendo...
                        </>
                      ) : (
                        'Gerar Notícia (1 Crédito)'
                      )}
                    </button>
                    
                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-2">Dica Profissional</h3>
                  <p className="text-sm text-blue-700">
                    Seja específico no campo de tópico. Inclua nomes, datas e locais para que a IA possa criar uma notícia mais rica e factível.
                  </p>
                </div>
              </div>

              {/* Preview Area */}
              <div className="lg:col-span-8">
                {currentNews ? (
                  <NewsCard news={currentNews} />
                ) : (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <IconNewspaper className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium">Sua notícia aparecerá aqui</p>
                    <p className="text-sm">Preencha os dados ao lado para começar</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pricing View */}
          {view === 'pricing' && (
            <Pricing onPurchase={addCredits} />
          )}

          {/* History View */}
          {view === 'history' && (
            <div className="max-w-4xl mx-auto">
               <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <IconHistory className="w-6 h-6" />
                Histórico de Publicações
              </h2>
              
              {userState.history.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                  <p className="text-slate-500">Nenhuma notícia gerada ainda.</p>
                  <button 
                    onClick={() => setView('generator')}
                    className="mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Começar a escrever
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {userState.history.map((news, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                        setCurrentNews(news);
                        setView('generator');
                    }}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-slate-400">{new Date(news.date).toLocaleDateString()}</span>
                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{news.readingTimeMinutes} min leitura</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600">{news.headline}</h3>
                      <p className="text-slate-600 text-sm line-clamp-2">{news.subtitle}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs">A IA pode cometer erros. Verifique informações importantes antes de publicar.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;