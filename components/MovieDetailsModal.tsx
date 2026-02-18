import React, { useState, useEffect } from 'react';
import { Movie, User } from '../types';
import { geminiService } from '../services/geminiService';
import ReviewSection from './ReviewSection';

interface MovieDetailsModalProps {
  movie: Movie;
  onClose: () => void;
  user: User;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose, user }) => {
  const [trendingReason, setTrendingReason] = useState<string | null>(null);
  const [trendingScore, setTrendingScore] = useState<number | null>(null);
  const [isAdded, setIsAdded] = useState(user.watchlist.includes(movie.id));

  useEffect(() => {
    geminiService.predictTrending(movie).then(res => {
      setTrendingScore(res.score);
      setTrendingReason(res.reason);
    });
  }, [movie]);

  const handleAddToWatchlist = () => {
    setIsAdded(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-8 animate-fade-in">
      <div className="bg-[#0a0a0a] w-full max-w-6xl max-h-full overflow-y-auto rounded-3xl relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 bg-black/60 hover:bg-red-600 p-3 rounded-full transition-all hover:scale-110 active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="relative h-[450px]">
          <img src={movie.backdropUrl} className="w-full h-full object-cover ken-burns" alt={`${movie.title} backdrop`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 space-y-6 animate-slide-up">
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl">{movie.title}</h2>
             <div className="flex items-center space-x-4">
               <button className="bg-red-600 text-white px-12 py-4 rounded-xl font-bold hover:bg-red-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 shadow-2xl shadow-red-900/40">
                 <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 <span className="text-lg">Play Movie</span>
               </button>
               <button 
                onClick={handleAddToWatchlist}
                className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold border transition-all duration-500 ${isAdded ? 'bg-green-600/10 border-green-500/30 text-green-400' : 'bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10'}`}
               >
                 {isAdded ? <span>In Watchlist</span> : <span>Add to Collection</span>}
               </button>
             </div>
          </div>
        </div>

        <div className="p-12 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <p className="text-2xl leading-relaxed text-gray-400 animate-slide-up stagger-2">{movie.overview}</p>
            <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-white/10 p-8 rounded-3xl space-y-6 animate-slide-up stagger-3">
              <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.3em]">AI Insight</h3>
              {trendingReason ? (
                <div className="space-y-4">
                  <p className="text-xl font-medium text-white italic">"{trendingReason}"</p>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${trendingScore}%` }} />
                  </div>
                </div>
              ) : <p className="animate-pulse">Analyzing...</p>}
            </div>
            <ReviewSection movieId={movie.id} />
          </div>
          <div className="space-y-10">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="text-[10px] text-gray-500 font-black uppercase mb-4">Director</h4>
              <p className="text-lg font-black">{movie.director}</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="text-[10px] text-gray-500 font-black uppercase mb-6">Starring</h4>
              <div className="space-y-5">
                {movie.cast.map(actor => (
                  <div key={actor.name} className="flex items-center space-x-4">
                    <img src={actor.imageUrl} className="h-12 w-12 rounded-full object-cover" alt={actor.name} />
                    <div>
                      <p className="text-sm font-black">{actor.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{actor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;