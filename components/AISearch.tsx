
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Movie } from '../types';

interface AISearchProps {
  movies: Movie[];
  onClose: () => void;
  onMovieClick: (m: Movie) => void;
}

const AISearch: React.FC<AISearchProps> = ({ movies, onClose, onMovieClick }) => {
  const [mood, setMood] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!mood.trim()) return;
    setIsLoading(true);
    const recommendedTitles = await geminiService.getSmartRecommendations(mood, movies);
    const matchedMovies = movies.filter(m => recommendedTitles.includes(m.title));
    setResults(matchedMovies);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0d0d0d] rounded-[2.5rem] p-10 border border-white/10 shadow-[0_0_100px_rgba(220,38,38,0.2)] animate-scale-in">
        <div className="flex justify-between items-start mb-10">
          <div className="animate-slide-up">
            <h2 className="text-4xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent tracking-tighter">AI CineScout</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Tell me a story, a feeling, or a mood.</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-red-600 rounded-full transition-all hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="space-y-6 animate-slide-up stagger-1">
          <div className="relative">
            <textarea 
              className="w-full bg-black/60 border-2 border-white/5 rounded-3xl p-6 text-xl focus:outline-none focus:border-red-600 transition-all min-h-[160px] placeholder:text-gray-700 resize-none font-medium leading-relaxed"
              placeholder="E.g. I need an epic sci-fi journey that feels lonely and cold, but ultimately hopeful..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            <div className="absolute bottom-6 right-6 pointer-events-none opacity-20">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/></svg>
            </div>
          </div>
          
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                <span className="uppercase tracking-widest text-sm">Synchronizing Intelligence</span>
              </div>
            ) : (
              <>
                <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
                <span>Synthesize Picks</span>
              </>
            )}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-12 space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-2">Matches found in database</h3>
            <div className="grid grid-cols-2 gap-6">
              {results.map((movie, index) => (
                <div 
                  key={movie.id} 
                  onClick={() => onMovieClick(movie)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="bg-white/5 p-4 rounded-3xl flex items-center space-x-5 cursor-pointer hover:bg-white/10 transition-all border border-transparent hover:border-red-500/30 group animate-scale-in"
                >
                  <img src={movie.posterUrl} className="w-20 h-28 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform" alt={movie.title} />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-black text-base truncate group-hover:text-red-500 transition-colors">{movie.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="bg-red-600/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded uppercase">{movie.rating} Score</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest truncate">{movie.genres[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISearch;
