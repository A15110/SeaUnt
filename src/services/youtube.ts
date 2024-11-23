const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCjddOP9IeN21YKijqUoeIMQ';

export async function fetchLatestVideos(maxResults = 9) {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?` +
      `part=snippet` +
      `&channelId=${CHANNEL_ID}` +
      `&maxResults=${maxResults}` +
      `&order=date` +
      `&type=video` +
      `&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `Failed to fetch videos: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items?.length) {
      throw new Error('No videos found');
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
}