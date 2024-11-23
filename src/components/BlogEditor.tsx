import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogService } from '../services/blog';
import { useAuth } from '../hooks/useAuth';
import { PenTool, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogEditorProps {
  onSave?: () => void;
}

export default function BlogEditor({ onSave }: BlogEditorProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to create a post');
      return;
    }

    setIsSubmitting(true);
    try {
      await blogService.createPost({
        title,
        content,
        imageUrl,
        authorId: user.id,
        authorName: user.user_metadata?.full_name || 'Anonymous',
      });
      
      setTitle('');
      setContent('');
      setImageUrl('');
      onSave?.();
      toast.success('Blog post published successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to publish blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <PenTool className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold">Create New Post</h2>
        </div>

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
              Cover Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => window.open('https://unsplash.com', '_blank')}
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <div className="prose max-w-none">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                className="h-64 mb-12"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition duration-200"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </form>
  );
}