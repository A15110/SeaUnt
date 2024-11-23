import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { printfulService } from '../services/printful';
import { useCartStore } from '../store/cart';
import type { PrintfulProduct } from '../types/printful';
import ProductCard from '../components/ProductCard';
import ProductDetails from '../components/ProductDetails';
import CartDrawer from '../components/CartDrawer';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function Shop() {
  const [products, setProducts] = useState<PrintfulProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PrintfulProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore(state => state.items);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await printfulService.getProducts();
      setProducts(fetchedProducts);
    } catch (err: any) {
      console.error('Shop error:', err);
      setError(err.message || 'Failed to load products');
      toast.error(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse flex justify-center items-center">
            <div className="text-white text-xl">Loading awesome gear...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sea UNT Shop | Nautical Gear & Apparel</title>
        <meta 
          name="description" 
          content="Shop our exclusive collection of sailing-inspired apparel and gear. Perfect for ocean lovers and adventurers."
        />
      </Helmet>
      
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  Sea UNT Shop
                </span>
              </h1>
              <p className="text-xl text-blue-200">Gear Up for Your Next Adventure</p>
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white text-blue-900 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-50 transition duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {error ? (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
              <button
                onClick={loadProducts}
                className="mt-4 text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default Shop;