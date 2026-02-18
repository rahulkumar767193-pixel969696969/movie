
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onPlay: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-4 md:px-12 max-w-3xl space-y-6">
        <div className="space-y-4 animate-slide-up stagger-1">
          <span className="inline-block bg-red-600 px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase shadow-lg shadow-red-900/40">
            Featured Masterpiece
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-none drop-shadow-2xl tracking-tighter">
            {movie.title}
          </h1>
        </div>
        
        <p className="text-xl text-gray-200 line-clamp-3 drop-shadow-md animate-slide-up stagger-2 max-w-xl leading-relaxed">
          {movie.overview}
        </p>

        <div className="flex items-center space-x-4 animate-slide-up stagger-3">
          <button 
            onClick={onPlay}
            className="bg-white text-black px-10 py-4 rounded-lg flex items-center space-x-3 font-bold hover:bg-red-600 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <span className="text-lg">Watch Now</span>
          </button>
          
          <button 
            onClick={onPlay}
            className="bg-white/10 backdrop-blur-xl text-white px-10 py-4 rounded-lg flex items-center space-x-3 font-bold border border-white/10 hover:bg-white/20 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-lg">Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
