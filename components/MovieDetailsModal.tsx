
import React, { useState, useEffect } from 'react';
import { Movie, User, Review } from '../types';
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
    console.log(`[Watchlist Service] Request initiated for "${movie.title}"`);
    setIsAdded(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-8 animate-fade-in">
      <div className="bg-[#0a0a0a] w-full max-w-6xl max-h-full overflow-y-auto rounded-3xl relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 bg-black/60 hover:bg-red-600 p-3 rounded-full transition-all hover:scale-110 active:scale-90"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="relative h-[450px]">
          <img src={movie.backdropUrl} className="w-full h-full object-cover ken-burns" alt={`${movie.title} backdrop`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 space-y-6 animate-slide-up">
             <div className="flex items-center space-x-3 text-red-600 font-black text-xs uppercase tracking-[0.2em]">
                <span className="w-8 h-px bg-red-600"></span>
                <span>Now Showing</span>
             </div>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl">{movie.title}</h2>
             <div className="flex items-center space-x-4">
               <button className="bg-red-600 text-white px-12 py-4 rounded-xl font-bold hover:bg-red-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 shadow-2xl shadow-red-900/40">
                 <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 <span className="text-lg">Play Movie</span>
               </button>
               
               <button 
                onClick={handleAddToWatchlist}
                disabled={isAdded}
                className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold border transition-all duration-500 ${
                  isAdded 
                  ? 'bg-green-600/10 border-green-500/30 text-green-400 cursor-default scale-95' 
                  : 'bg-white/5 backdrop-blur-md text-white border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95'
                }`}
               >
                 {isAdded ? (
                   <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    <span>In Watchlist</span>
                   </>
                 ) : (
                   <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                    <span>Add to Collection</span>
                   </>
                 )}
               </button>
             </div>
          </div>
        </div>

        <div className="p-12 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex flex-wrap items-center gap-6 animate-slide-up stagger-1">
              <span className="text-green-400 font-black text-xl">{movie.rating * 10}% Audience Match</span>
              <span className="text-white/60 font-bold">{movie.releaseYear}</span>
              <span className="bg-white/10 px-3 py-1 text-xs font-black rounded tracking-widest uppercase">Ultra HD</span>
              <span className="text-white/60 font-bold">{movie.duration}</span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 fill-current ${i < Math.floor(movie.rating/2) ? 'text-yellow-500' : 'text-gray-700'}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
            </div>

            <p className="text-2xl leading-relaxed text-gray-400 animate-slide-up stagger-2">
              {movie.overview}
            </p>

            <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-white/10 p-8 rounded-3xl space-y-6 animate-slide-up stagger-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
              </div>
              <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.3em] flex items-center space-x-3">
                <span className="animate-pulse">✨</span> 
                <span>AI Insight</span>
              </h3>
              {trendingReason ? (
                <div className="space-y-4">
                  <p className="text-xl font-medium text-white italic leading-snug">"{trendingReason}"</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <span>Viral Potential</span>
                      <span className="text-white">{trendingScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-1000 ease-out" 
                        style={{ width: `${trendingScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent" />
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Analyzing Trend Vectors...</p>
                </div>
              )}
            </div>

            <div className="animate-slide-up stagger-4">
              <ReviewSection movieId={movie.id} />
            </div>
          </div>

          <div className="space-y-10 animate-fade-in stagger-3">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">Director</h4>
              <p className="text-lg font-black text-white">{movie.director}</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-6">Starring Cast</h4>
              <div className="space-y-5">
                {movie.cast.map(actor => (
                  <div key={actor.name} className="flex items-center space-x-4 group/actor cursor-pointer">
                    <div className="relative overflow-hidden rounded-full h-12 w-12 border-2 border-white/10 group-hover/actor:border-red-600 transition-all">
                      <img src={actor.imageUrl} className="w-full h-full object-cover group-hover/actor:scale-110 transition-transform duration-500" alt={actor.name} />
                    </div>
                    <div>
                      <p className="text-sm font-black group-hover/actor:text-red-500 transition-colors">{actor.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{actor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">Genre Spectrum</h4>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span key={g} className="text-[10px] font-black border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-600 transition-colors uppercase tracking-widest cursor-default">{g}</span>
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
