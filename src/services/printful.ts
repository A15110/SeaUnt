import axios from 'axios';
import type { PrintfulProduct } from '../types/printful';

const PRINTFUL_API_KEY = '8qrmJiwVFbvslh8pRW3a6qpTeM9O4K53wGXd2OKX';

const printfulAxios = axios.create({
  baseURL: 'https://api.printful.com',
  headers: {
    'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Error handling interceptor
printfulAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please check your API key.');
    }
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a minute.');
    }
    throw error.response?.data?.error || error;
  }
);

export const printfulService = {
  async getProducts(): Promise<PrintfulProduct[]> {
    try {
      const { data } = await printfulAxios.get('/sync/products');
      return data.result;
    } catch (error) {
      console.error('Error fetching Printful products:', error);
      throw error;
    }
  },

  async getProduct(id: string): Promise<PrintfulProduct> {
    try {
      const { data } = await printfulAxios.get(`/sync/products/${id}`);
      return data.result;
    } catch (error) {
      console.error('Error fetching Printful product:', error);
      throw error;
    }
  }
};