import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'prod_1',
    articleNo: 'A101',
    name: 'Nebula Smart Projector',
    price: 299.99,
    qty: 50,
    image: 'https://picsum.photos/seed/A101/600/400',
    description: 'A compact and powerful smart projector that brings the cinema experience to your home. With stunning 1080p resolution and built-in streaming apps, movie nights will never be the same. Its portable design allows you to set it up anywhere, anytime.',
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'prod_2',
    articleNo: 'A102',
    name: 'Aura Wireless Headphones',
    price: 139.99,
    qty: 30,
    image: 'https://picsum.photos/seed/A102/600/400',
    description: 'Immerse yourself in crystal-clear audio with the Aura Wireless Headphones. Featuring active noise cancellation and a 30-hour battery life, they are perfect for music lovers and frequent travelers. The plush earcups provide all-day comfort.',
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-25T14:30:00Z',
  },
  {
    id: 'prod_3',
    articleNo: 'A103',
    name: 'Terra Mechanical Keyboard',
    price: 149.99,
    qty: 20,
    image: 'https://picsum.photos/seed/A103/600/400',
    description: 'Elevate your typing experience with the Terra Mechanical Keyboard. Built with a solid aluminum frame and satisfying tactile switches, it offers both durability and precision. The customizable RGB backlighting lets you personalize your setup.',
    createdAt: '2023-10-24T11:00:00Z',
    updatedAt: '2023-10-24T11:00:00Z',
  },
  {
    id: 'prod_4',
    articleNo: 'B201',
    name: 'Orbit Smartwatch',
    price: 249.99,
    qty: 75,
    image: 'https://picsum.photos/seed/B201/600/400',
    description: 'Stay connected and track your fitness goals with the Orbit Smartwatch. It features a vibrant AMOLED display, heart rate monitoring, and GPS tracking. With a sleek design, it is the perfect accessory for any occasion.',
    createdAt: '2023-10-23T09:15:00Z',
    updatedAt: '2023-10-23T09:15:00Z',
  },
  {
    id: 'prod_5',
    articleNo: 'B202',
    name: 'Echo Smart Speaker',
    price: 99.99,
    qty: 120,
    image: 'https://picsum.photos/seed/B202/600/400',
    description: 'Control your smart home, play music, and get answers to your questions with the Echo Smart Speaker. Its powerful speakers deliver rich, room-filling sound. A central hub for your modern home.',
    createdAt: '2023-10-22T18:00:00Z',
    updatedAt: '2023-10-22T18:00:00Z',
  },
  {
    id: 'prod_6',
    articleNo: 'C301',
    name: 'Flex Ergonomic Chair',
    price: 399.00,
    qty: 15,
    image: 'https://picsum.photos/seed/C301/600/400',
    description: 'Work in comfort with the Flex Ergonomic Chair. Designed to support your posture through long workdays, it features adjustable armrests, lumbar support, and a breathable mesh back. Boost your productivity and well-being.',
    createdAt: '2023-10-21T13:45:00Z',
    updatedAt: '2023-10-21T13:45:00Z',
  }
];

// In-memory store for demo purposes. In a real app, this would be a database.
let mockProducts: Product[] = [...products];

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(mockProducts);
};

export const getProductByArticleNo = async (articleNo: string): Promise<Product | undefined> => {
  return Promise.resolve(mockProducts.find(p => p.articleNo === articleNo));
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return Promise.resolve(mockProducts.find(p => p.id === id));
}

export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const newProduct: Product = {
    ...productData,
    id: `prod_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.unshift(newProduct);
  return Promise.resolve(newProduct);
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
  const productIndex = mockProducts.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return undefined;
  }
  const updatedProduct = {
    ...mockProducts[productIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  mockProducts[productIndex] = updatedProduct;
  return Promise.resolve(updatedProduct);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const initialLength = mockProducts.length;
  mockProducts = mockProducts.filter(p => p.id !== id);
  return Promise.resolve(mockProducts.length < initialLength);
};
