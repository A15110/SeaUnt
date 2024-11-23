import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Anchor, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, error, signInWithGoogle, signOutUser } = useAuth();

  return (
    <nav className="bg-blue-900 text-white fixed w-full z-50">
      <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 text-sm flex items-center justify-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
        
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Anchor className="h-8 w-8" />
            <span className="text-xl font-bold">Sea UNT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <Link to="/shop" className="hover:text-blue-300">Shop</Link>
            <Link to="/blog" className="hover:text-blue-300">Blog</Link>
            <a 
              href="https://www.youtube.com/@dd214veteran" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              YouTube
            </a>
            {isAdmin && (
              <Link to="/admin" className="hover:text-blue-300">Admin</Link>
            )}
            {user ? (
              <button 
                onClick={signOutUser}
                className="btn-secondary"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="btn-primary"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md hover:bg-blue-800"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="block px-3 py-2 rounded-md hover:bg-blue-800"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/blog" 
                className="block px-3 py-2 rounded-md hover:bg-blue-800"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <a 
                href="https://www.youtube.com/@dd214veteran" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md hover:bg-blue-800"
                onClick={() => setIsOpen(false)}
              >
                YouTube
              </a>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-800"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user ? (
                <button 
                  onClick={() => {
                    signOutUser();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-800"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={() => {
                    signInWithGoogle();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-800"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;