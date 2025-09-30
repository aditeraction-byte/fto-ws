import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'prod_1',
    articleNo: 'F101',
    name: 'Lakeside Linen Blend',
    price: 34.99,
    qty: 150,
    image: 'https://images.unsplash.com/photo-1616091216799-413978716b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGZhYnJpY3xlbnwwfHx8fDE3NTkzMDY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A beautiful blend of linen and cotton, perfect for breezy curtains and lightweight apparel. The subtle texture and soft drape bring a touch of natural elegance to any project. Available in a calming lakeside blue.',
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'prod_2',
    articleNo: 'F102',
    name: 'Sunset Velvet',
    price: 45.50,
    qty: 80,
    image: 'https://images.unsplash.com/photo-1616091216799-413978716b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGZhYnJpY3xlbnwwfHx8fDE3NTkzMDY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Indulge in the luxurious softness of our Sunset Velvet. With its rich pile and beautiful sheen, this fabric is ideal for creating statement upholstery, elegant evening wear, and plush home accessories. The warm, inviting color evokes a sunset glow.',
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-25T14:30:00Z',
  },
  {
    id: 'prod_3',
    articleNo: 'F103',
    name: 'Forest Floor Corduroy',
    price: 28.00,
    qty: 120,
    image: 'https://images.unsplash.com/photo-1616091216799-413978716b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGZhYnJpY3xlbnwwfHx8fDE3NTkzMDY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Durable and timeless, our Forest Floor Corduroy features a classic 8-wale rib. It\'s the perfect choice for sturdy trousers, rustic jackets, and cozy cushions. The deep green hue is inspired by the textures of nature.',
    createdAt: '2023-10-24T11:00:00Z',
    updatedAt: '2023-10-24T11:00:00Z',
  },
  {
    id: 'prod_4',
    articleNo: 'T201',
    name: 'Midnight Meadow Floral Cotton',
    price: 22.99,
    qty: 200,
    image: 'https://images.unsplash.com/photo-1616091216799-413978716b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGZhYnJpY3xlbnwwfHx8fDE3NTkzMDY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A soft, breathable 100% cotton poplin featuring a delicate floral print on a dark navy background. Ideal for quilting, creating charming dresses, and crafting unique home decor items that require a touch of midnight magic.',
    createdAt: '2023-10-23T09:15:00Z',
    updatedAt: '2023-10-23T09:15:00Z',
  },
  {
    id: 'prod_5',
    articleNo: 'T202',
    name: 'Oatmeal Knit Jersey',
    price: 19.50,
    qty: 180,
    image: 'https://images.unsplash.com/photo-1616091216799-413978716b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGZhYnJpY3xlbnwwfHx8fDE3NTkzMDY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Our Oatmeal Knit Jersey is incredibly soft with a comfortable four-way stretch. Perfect for t-shirts, loungewear, and childrens clothing. Its neutral, flecked appearance makes it a versatile staple for any wardrobe.',
    createdAt: '2023-10-22T18:00:00Z',
    updatedAt: '2023-10-22T18:00:00Z',
  },
  {
    id: 'prod_6',
    articleNo: 'S301',
    name: 'Crimson Silk Charmeuse',
    price: 65.00,
    qty: 40,
    image: 'https://images.unsplash.com/photo-16160H1216799-413978716b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGZhYnJpY3xlbnwwfHx8fDE3NTkzMDY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Experience pure luxury with our Crimson Silk Charmeuse. This lightweight fabric has a glossy satin finish on one side and a dull crepe on the other. It drapes beautifully, making it ideal for blouses, lingerie, and formal gowns.',
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
