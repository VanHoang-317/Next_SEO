import fs from "fs";
import path from "path";
import { cache } from "react";

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  tags: string[];
}

interface Db {
  categories: Category[];
  products: Product[];
}

// Đọc file db.json
const getDb = (): Db => {
  const filePath = path.join(process.cwd(), "./src/lib/db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData) as Db;
};

export const getCategories = cache(async (): Promise<Category[]> => {
  const db = getDb();
  return db.categories;
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const db = getDb();
  return db.products;
});

export const getCategoryById = cache(
  async (id: string): Promise<Category | undefined> => {
    const db = getDb();
    return db.categories.find((cat) => cat.id === id);
  },
);

export const getProductsByCategory = cache(
  async (category: string): Promise<Product[]> => {
    const db = getDb();
    return db.products.filter(
      (prod) => prod.category.toLowerCase() === category.toLowerCase(),
    );
  },
);

export const getProductById = cache(
  async (id: string): Promise<Product | undefined> => {
    const db = getDb();
    return db.products.find((prod) => prod.id.toString() === id);
  },
);

export const searchProducts = cache(async (query = ""): Promise<Product[]> => {
  const db = getDb();
  const lowerQuery = query.trim().toLowerCase();

  if (!lowerQuery) {
    return [];
  }

  return db.products.filter(
    (prod) =>
      prod.name.toLowerCase().includes(lowerQuery) ||
      prod.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
});
