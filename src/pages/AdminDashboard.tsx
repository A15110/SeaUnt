import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import BlogEditor from '../components/BlogEditor';
import VideoManager from '../components/VideoManager';
import { Anchor, PenTool, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blog');

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Sea UNT</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center gap-4 mb-8">
            <Anchor className="h-12 w-12 text-white" />
            <div>
              <h1 className="text-4xl font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="text-blue-200">
                Manage your content and website settings
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex space-x-2 mb-6">
                <TabsTrigger 
                  value="blog"
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'blog' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Blog Posts
                </TabsTrigger>
                <TabsTrigger 
                  value="videos"
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'videos' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  Videos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="blog">
                <BlogEditor 
                  onSave={() => toast.success('Blog post saved successfully!')}
                />
              </TabsContent>

              <TabsContent value="videos">
                <VideoManager 
                  onSave={() => toast.success('Video added successfully!')}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}