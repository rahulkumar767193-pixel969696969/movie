
import React, { useState } from 'react';
import { Review } from '../types';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'MovieBuff88',
    userAvatar: 'https://picsum.photos/seed/a1/100/100',
    content: 'An absolute masterpiece of modern cinema. The visual effects combined with the deep philosophical themes make it a must-watch.',
    rating: 5,
    likes: 124,
    dislikes: 12,
    date: '2 weeks ago'
  },
  {
    id: 'r2',
    userName: 'CinemaCritic',
    userAvatar: 'https://picsum.photos/seed/a2/100/100',
    content: 'Pacing was a bit slow in the second act, but the ending more than makes up for it. Highly recommended for fans of the genre.',
    rating: 4,
    likes: 89,
    dislikes: 4,
    date: '1 month ago'
  }
];

const ReviewSection: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    
    const review: Review = {
      id: Date.now().toString(),
      userName: 'You',
      userAvatar: 'https://picsum.photos/seed/me/100/100',
      content: newReview,
      rating: 5,
      likes: 0,
      dislikes: 0,
      date: 'Just now'
    };
    
    setReviews([review, ...reviews]);
    setNewReview('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Reviews</h3>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400 font-bold text-2xl">4.8</span>
          <div className="flex text-yellow-400">
             {[...Array(5)].map((_, i) => (
               <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
             ))}
          </div>
          <span className="text-gray-500 text-sm">(1.2k reviews)</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea 
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="What did you think of the movie?"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-red-600 transition-all"
        />
        <div className="flex justify-end">
          <button className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">Post Review</button>
        </div>
      </form>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <img src={review.userAvatar} className="w-10 h-10 rounded-full" alt={review.userName} />
                <div>
                  <h4 className="font-bold">{review.userName}</h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{review.content}</p>
            <div className="flex items-center space-x-6 mt-6">
               <button className="flex items-center space-x-2 text-xs text-gray-500 hover:text-white transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                 <span>{review.likes}</span>
               </button>
               <button className="flex items-center space-x-2 text-xs text-gray-500 hover:text-white transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m7-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/></svg>
                 <span>{review.dislikes}</span>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
