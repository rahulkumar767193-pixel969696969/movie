
export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  releaseYear: number;
  duration: string;
  genres: string[];
  director: string;
  cast: CastMember[];
  trailerUrl?: string;
  popularity: number;
}

export interface CastMember {
  name: string;
  role: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  rating: number;
  likes: number;
  dislikes: number;
  date: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  watchlist: string[];
}
