
import React from 'react';
import { MOVIES } from '../mockData';

const AdminDashboard: React.FC = () => {
  return (
    <div className="pt-24 px-4 md:px-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black">Management Dashboard</h2>
          <p className="text-gray-500">Overview of platform content and user engagement.</p>
        </div>
        <div className="flex items-center space-x-4">
           <button className="bg-red-600 px-6 py-2 rounded-lg font-bold text-sm">Add New Movie</button>
           <button className="bg-white/10 px-6 py-2 rounded-lg font-bold text-sm">Export Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-black mt-1">14,208</p>
          <p className="text-xs text-green-400 mt-2">↑ 12% this month</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-sm font-medium">Active Subscriptions</p>
          <p className="text-3xl font-black mt-1">$42,900</p>
          <p className="text-xs text-green-400 mt-2">↑ 8% this week</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-sm font-medium">Pending Reviews</p>
          <p className="text-3xl font-black mt-1">42</p>
          <p className="text-xs text-orange-400 mt-2">Requires action</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-500 text-sm font-medium">Server Load</p>
          <p className="text-3xl font-black mt-1">24%</p>
          <p className="text-xs text-blue-400 mt-2">Optimal performance</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold">Catalog Management</h3>
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-1 text-xs focus:outline-none"
          />
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-500">
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider">Movie</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider">Views</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider">Rating</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOVIES.map(movie => (
              <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img src={movie.posterUrl} className="w-10 h-14 rounded object-cover" alt="" />
                  <div>
                    <p className="font-bold">{movie.title}</p>
                    <p className="text-xs text-gray-500">{movie.genres[0]}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-[10px] font-bold uppercase">Published</span>
                </td>
                <td className="px-6 py-4 font-mono">{(movie.popularity * 1234).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold">{movie.rating}</span>
                    <svg className="w-3 h-3 fill-yellow-500" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
