import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export const shopService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.image_url,
      embedCode: product.embed_code,
      active: product.active,
      createdAt: new Date(product.created_at),
      updatedAt: new Date(product.updated_at)
    })) as Product[];
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.imageUrl,
        embed_code: product.embedCode,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: Partial<Product>) {
    const { error } = await supabase
      .from('products')
      .update({
        name: updates.name,
        description: updates.description,
        price: updates.price,
        image_url: updates.imageUrl,
        embed_code: updates.embedCode,
        active: updates.active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .eq('id', id);

    if (error) throw error;
  }
};