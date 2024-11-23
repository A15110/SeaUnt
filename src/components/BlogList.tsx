import React from 'react';
import type { BlogPost } from '../types';

interface BlogListProps {
  posts: BlogPost[];
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function BlogList({ posts, onDelete, isAdmin }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">
              {post.content.substring(0, 150)}...
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{post.authorName}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            {isAdmin && onDelete && (
              <button
                onClick={() => onDelete(post.id)}
                className="mt-4 text-red-600 hover:text-red-800"
              >
                Delete Post
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}