
import { Movie, UserRole, User } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Interstellar',
    overview: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    posterUrl: 'https://picsum.photos/seed/interstellar_p/400/600',
    backdropUrl: 'https://picsum.photos/seed/interstellar_b/1280/720',
    rating: 8.7,
    releaseYear: 2014,
    duration: '2h 49m',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    director: 'Christopher Nolan',
    popularity: 98,
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper', imageUrl: 'https://picsum.photos/seed/actor1/200/200' },
      { name: 'Anne Hathaway', role: 'Brand', imageUrl: 'https://picsum.photos/seed/actor2/200/200' }
    ]
  },
  {
    id: '2',
    title: 'Dune: Part Two',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    posterUrl: 'https://picsum.photos/seed/dune_p/400/600',
    backdropUrl: 'https://picsum.photos/seed/dune_b/1280/720',
    rating: 8.9,
    releaseYear: 2024,
    duration: '2h 46m',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    director: 'Denis Villeneuve',
    popularity: 99,
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', imageUrl: 'https://picsum.photos/seed/actor3/200/200' },
      { name: 'Zendaya', role: 'Chani', imageUrl: 'https://picsum.photos/seed/actor4/200/200' }
    ]
  },
  {
    id: '3',
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: 'https://picsum.photos/seed/darkknight_p/400/600',
    backdropUrl: 'https://picsum.photos/seed/darkknight_b/1280/720',
    rating: 9.0,
    releaseYear: 2008,
    duration: '2h 32m',
    genres: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    popularity: 97,
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne', imageUrl: 'https://picsum.photos/seed/actor5/200/200' },
      { name: 'Heath Ledger', role: 'Joker', imageUrl: 'https://picsum.photos/seed/actor6/200/200' }
    ]
  },
  {
    id: '4',
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://picsum.photos/seed/inception_p/400/600',
    backdropUrl: 'https://picsum.photos/seed/inception_b/1280/720',
    rating: 8.8,
    releaseYear: 2010,
    duration: '2h 28m',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    director: 'Christopher Nolan',
    popularity: 95,
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Cobb', imageUrl: 'https://picsum.photos/seed/actor7/200/200' }
    ]
  },
  {
    id: '5',
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    posterUrl: 'https://picsum.photos/seed/godfather_p/400/600',
    backdropUrl: 'https://picsum.photos/seed/godfather_b/1280/720',
    rating: 9.2,
    releaseYear: 1972,
    duration: '2h 55m',
    genres: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    popularity: 94,
    cast: [
      { name: 'Marlon Brando', role: 'Vito Corleone', imageUrl: 'https://picsum.photos/seed/actor8/200/200' }
    ]
  }
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@cineai.com',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  role: UserRole.USER,
  watchlist: ['1', '3']
};
