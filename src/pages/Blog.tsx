import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { blogService } from '../services/blog';
import BlogList from '../components/BlogList';
import { useAuth } from '../hooks/useAuth';
import type { BlogPost } from '../types';

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await blogService.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex justify-center items-center">
            <div className="text-white text-xl">Loading posts...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sea UNT Blog | Caribbean Sailing Adventures</title>
        <meta 
          name="description" 
          content="Read about our latest sailing adventures, tips, and stories from the Caribbean seas." 
        />
      </Helmet>
      
      <div className="pt-20 min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Adventure Blog</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {posts.length === 0 && !loading ? (
            <div className="text-white text-center py-8">
              <p className="text-xl">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <BlogList 
              posts={posts} 
              onDelete={isAdmin ? handleDelete : undefined}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;