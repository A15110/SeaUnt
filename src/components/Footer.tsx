import React from 'react';
import { Youtube, Instagram, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sea Adventures</h3>
            <p className="text-blue-200">
              Join us on our journey through the Caribbean seas, one adventure at a time.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-blue-200 hover:text-white">Shop</a></li>
              <li><a href="/blog" className="text-blue-200 hover:text-white">Blog</a></li>
              <li><a href="#latest-videos" className="text-blue-200 hover:text-white">Videos</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@dd214veteran" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-200 hover:text-white">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Sea Adventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;