import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PrintfulProduct } from '../types/printful';

interface CartItem {
  product: Omit<PrintfulProduct, 'variants'> & {
    variants: Array<{
      id: number;
      retail_price: string;
      name: string;
    }>;
  };
  quantity: number;
  variantId?: number;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: PrintfulProduct, variantId?: number, size?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variantId, size) => {
        const items = get().items;
        const existingItem = items.find(
          item => 
            item.product.id === product.id && 
            item.variantId === variantId && 
            item.size === size
        );
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id &&
              item.variantId === variantId &&
              item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Create a simplified product object that can be serialized
          const serializedProduct = {
            ...product,
            variants: product.variants.map(v => ({
              id: v.id,
              retail_price: v.retail_price,
              name: v.name
            }))
          };
          
          set({ 
            items: [...items, { 
              product: serializedProduct, 
              quantity: 1, 
              variantId, 
              size 
            }] 
          });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product.id !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        set({
          items: get().items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((sum, item) => {
          const variant = item.variantId 
            ? item.product.variants.find(v => v.id === item.variantId)
            : item.product.variants[0];
          const price = parseFloat(variant?.retail_price || '0');
          return sum + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'sea-unt-cart',
    }
  )
);