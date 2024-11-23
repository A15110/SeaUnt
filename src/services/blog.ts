import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

export const blogService = {
  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: post.title,
        content: post.content,
        image_url: post.imageUrl,
        author_id: post.authorId,
        author_name: post.authorName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.image_url,
      authorId: post.author_id,
      authorName: post.author_name,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at)
    })) as BlogPost[];
  },

  async updatePost(id: string, updates: Partial<BlogPost>) {
    const { error } = await supabase
      .from('posts')
      .update({
        title: updates.title,
        content: updates.content,
        image_url: updates.imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};