import React, { useState } from 'react';
import type { PrintfulProduct } from '../types/printful';
import { ShoppingCart, ChevronDown } from 'lucide-react';

interface ProductCardProps {
  product: PrintfulProduct;
  onAddToCart: (product: PrintfulProduct, variantId?: number, size?: string) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative pb-[100%]">
        <img
          src={product.thumbnail_url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        
        {product.variants.length > 1 && (
          <div className="relative mb-4">
            <button
              onClick={() => setIsVariantOpen(!isVariantOpen)}
              className="w-full px-4 py-2 text-left bg-gray-100 rounded-lg flex items-center justify-between"
            >
              <span>{selectedVariant.name}</span>
              <ChevronDown className={`transform transition-transform ${isVariantOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isVariantOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setIsVariantOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ${selectedVariant.retail_price}
          </span>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition duration-300"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;