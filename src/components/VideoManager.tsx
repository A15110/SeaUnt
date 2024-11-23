import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface Video {
  id: string;
  title: string;
  description: string;
  embed_url: string;
  created_at: string;
}

export default function VideoManager({ onSave }: { onSave: () => void }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
      toast.error('Failed to load videos');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Extract video ID from YouTube URL
      const videoId = embedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
      
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const { error } = await supabase
        .from('videos')
        .insert([{
          title,
          description,
          embed_url: `https://www.youtube.com/embed/${videoId}`,
        }]);

      if (error) throw error;

      setTitle('');
      setDescription('');
      setEmbedUrl('');
      loadVideos();
      onSave();
    } catch (error: any) {
      console.error('Error saving video:', error);
      toast.error(error.message || 'Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadVideos();
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Video</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube URL
            </label>
            <input
              type="url"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {loading ? 'Adding...' : 'Add Video'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Manage Videos</h3>
        
        <div className="space-y-4">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h4 className="font-semibold">{video.title}</h4>
                <p className="text-sm text-gray-600">{video.description}</p>
                <div className="mt-2 aspect-video w-full max-w-md">
                  <iframe
                    src={video.embed_url}
                    className="w-full h-full rounded"
                    allowFullScreen
                  />
                </div>
              </div>
              <button
                onClick={() => handleDelete(video.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {videos.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No videos added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}