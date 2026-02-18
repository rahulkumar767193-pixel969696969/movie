
import React from 'react';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (m: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick }) => {
  return (
    <div className="space-y-4 group animate-slide-up">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center space-x-3">
          <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
          <span>{title}</span>
        </h2>
        <span className="text-xs font-bold text-gray-500 hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Explore All</span>
      </div>
      
      <div className="flex space-x-5 overflow-x-auto hide-scrollbar pb-10 px-2 scroll-smooth">
        {movies.map((movie, index) => (
          <div 
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="flex-none w-44 md:w-64 aspect-[2/3] relative group/card cursor-pointer transform transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 hover:z-30 card-glow animate-scale-in"
          >
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover rounded-xl shadow-2xl ring-1 ring-white/10"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 rounded-xl border border-white/20">
              <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                <h3 className="font-black text-base md:text-lg line-clamp-1 leading-tight">{movie.title}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="flex items-center text-yellow-400 text-xs font-bold">
                    <svg className="w-3 h-3 fill-current mr-1" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    {movie.rating}
                  </span>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{movie.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
