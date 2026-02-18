import React, { useState, useMemo } from 'react';
import { Movie, User, UserRole } from './types';
import { MOVIES, CURRENT_USER } from './mockData';
import { geminiService } from './services/geminiService';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetailsModal from './components/MovieDetailsModal';
import AISearch from './components/AISearch';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useState<User>(CURRENT_USER);
  const [showAIBox, setShowAIBox] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'admin'>('home');

  const filteredMovies = useMemo(() => {
    return MOVIES.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const trendingMovies = useMemo(() => [...MOVIES].sort((a, b) => b.popularity - a.popularity), []);
  const topRatedMovies = useMemo(() => [...MOVIES].sort((a, b) => b.rating - a.rating), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar 
        user={user} 
        onSearch={setSearchQuery} 
        onShowAI={() => setShowAIBox(true)}
        onSwitchTab={setActiveTab}
      />
      
      {activeTab === 'home' ? (
        <main className="pb-20">
          <Hero movie={MOVIES[1]} onPlay={() => setSelectedMovie(MOVIES[1])} />
          
          <div className="relative -mt-24 z-10 space-y-8 px-4 md:px-12">
            <MovieRow title="Trending Now" movies={trendingMovies} onMovieClick={setSelectedMovie} />
            <MovieRow title="Top Rated" movies={topRatedMovies} onMovieClick={setSelectedMovie} />
            <MovieRow title="Action & Adventure" movies={MOVIES.filter(m => m.genres.includes('Action'))} onMovieClick={setSelectedMovie} />
            <MovieRow title="Sci-Fi Epics" movies={MOVIES.filter(m => m.genres.includes('Sci-Fi'))} onMovieClick={setSelectedMovie} />
          </div>
        </main>
      ) : (
        <AdminDashboard />
      )}

      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          user={user}
        />
      )}

      {showAIBox && (
        <AISearch 
          movies={MOVIES} 
          onClose={() => setShowAIBox(false)} 
          onMovieClick={(m) => {
            setSelectedMovie(m);
            setShowAIBox(false);
          }}
        />
      )}

      <footer className="border-t border-white/10 py-10 px-12 text-center text-sm text-gray-500">
        <p>© 2024 CineAI Inc. All rights reserved.</p>
        <p className="mt-2 text-xs">Aesthetic Streaming Experience Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;