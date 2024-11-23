import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Youtube as YoutubeIcon, ExternalLink, Calendar } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  embed_url: string;
  created_at: string;
}

function YouTubeSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9);

      if (supabaseError) throw supabaseError;
      setVideos(data || []);
    } catch (err) {
      setError('Failed to load videos. Please try again later.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col items-center justify-center py-12">
        <YoutubeIcon className="w-12 h-12 text-gray-400 mb-4" />
        <div className="text-gray-600 text-xl">Loading latest adventures...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
          <p className="text-red-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="aspect-video">
              <iframe
                src={video.embed_url}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  {new Date(video.created_at).toLocaleDateString()}
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${video.embed_url.split('/').pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  <span className="mr-1">Watch</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <a
          href="https://www.youtube.com/@dd214veteran"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-lg font-semibold"
        >
          <YoutubeIcon className="w-6 h-6 mr-2" />
          Subscribe to Our Channel
        </a>
      </div>
    </div>
  );
}

export default YouTubeSection;