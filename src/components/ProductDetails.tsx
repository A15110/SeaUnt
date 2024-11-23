import React, { useState } from 'react';
import type { PrintfulProduct, PrintfulVariant } from '../types/printful';
import { useCartStore } from '../store/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductDetailsProps {
  product: PrintfulProduct;
  onClose: () => void;
}

function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<PrintfulVariant>(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const addItem = useCartStore(state => state.addItem);

  const sizes = Array.from(
    new Set(product.variants.map(variant => variant.name.split(' - ')[1]))
  ).filter(Boolean);

  const handleAddToCart = () => {
    addItem(product, selectedVariant.id, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.thumbnail_url}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 text-sm font-medium rounded-md ${
                          selectedSize === size
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-blue-600">
                  ${selectedVariant.retail_price}
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={sizes.length > 0 && !selectedSize}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;