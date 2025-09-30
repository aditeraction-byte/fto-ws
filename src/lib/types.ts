export type Product = {
  id: string;
  articleNo: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  qrCode?: string;
};

export type User = {
  email: string;
  role: "admin" | "user";
};
