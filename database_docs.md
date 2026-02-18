
# CineAI - Full Stack Architecture

## Database Schema (PostgreSQL)

### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'USER',
    google_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Movies Table
```sql
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tmdb_id INTEGER UNIQUE,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    poster_path TEXT,
    backdrop_path TEXT,
    release_date DATE,
    rating DECIMAL(3, 1),
    popularity DECIMAL(10, 2),
    duration_minutes INTEGER,
    genres TEXT[],
    is_trending BOOLEAN DEFAULT FALSE,
    ai_trending_score INTEGER
);
```

### 3. Reviews Table
```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Watchlist Table
```sql
CREATE TABLE watchlists (
    user_id UUID REFERENCES users(id),
    movie_id UUID REFERENCES movies(id),
    PRIMARY KEY (user_id, movie_id)
);
```

## Backend API Specification (FastAPI Example)

- `GET /api/movies` - List movies with pagination & filters
- `GET /api/movies/{id}` - Detailed movie info
- `POST /api/auth/google` - OAuth login
- `POST /api/reviews` - Add user review (JWT Protected)
- `POST /api/ai/recommend` - Query Gemini for personalized lists based on user watch history

## Performance Tuning
1. **Indexing:** Index `movies(title)`, `movies(release_date)`, and `reviews(movie_id)` for fast lookups.
2. **Caching:** Use **Redis** for `GET /api/movies/trending` with a 1-hour TTL.
3. **CDN:** Serve all movie assets (posters/backdrops) via Amazon CloudFront or Cloudflare for low latency.
