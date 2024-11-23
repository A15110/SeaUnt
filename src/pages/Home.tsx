import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Anchor, Youtube, Wind } from 'lucide-react';
import YouTubeSection from '../components/YouTubeSection';

function Home() {
  return (
    <>
      <Helmet>
        <title>Caribbean Sailing Adventures | Sea Adventure YouTube Channel</title>
        <meta name="description" content="Join us on our catamaran sailing adventures through the Caribbean. Watch our latest videos, shop marine gear, and read about our journey." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <div 
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Set Sail for Adventure
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  Join our journey through crystal waters and hidden paradises
                </p>
                <a 
                  href="#latest-videos"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center"
                >
                  <Youtube className="mr-2" />
                  Watch Our Adventures
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Latest Adventures</h2>
            <YouTubeSection channelId="@dd214veteran" />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Join the Adventure?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/shop" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center">
                <Anchor className="mr-2" />
                Shop Marine Gear
              </a>
              <a href="/blog" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center">
                <Wind className="mr-2" />
                Read Our Blog
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;