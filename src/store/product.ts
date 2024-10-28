
import { Product } from "@/types/product";
import { create } from "zustand";

interface ProductStore {
  path: string;
  products: [] | Product[];
  allProducts: () => void;
  findProduct: (id: number) => Promise<{ products: Product[] }>;
  findProducts: (keyWord: string) => Promise<{ products: Product[] }>;
  /* 


 
  saveSale:()=>void,
*/
}

export const ProductStore = create<ProductStore>((set, get) => ({
  path: "../src/data/productos.json",
  products: [],

  allProducts: async () => {
    const state = get();
    const response = await fetch(
      `/api/data?path=${encodeURIComponent(state.path)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const products: Product[] = await response.json();
      set(() => ({ products }));
    } else {
      console.error("Failed to fetch products:", await response.json());
    }
  },

  findProducts: async (keyWord: string) => {
    const state = get();
    const response = await fetch(
      `/api/data?path=${encodeURIComponent(state.path)}`
    );
    const products: Product[] = await response.json();
    const filteredProducts = products.filter(
      (product: Product) =>
        product.nombre.toLowerCase().includes(keyWord.toLowerCase()));
    set(() => ({
      products: filteredProducts,
    }));

    return { products: filteredProducts };
  },

  findProduct: async (id:number) => {
    const state = get();
    const response = await fetch(
      `/api/data?path=${encodeURIComponent(state.path)}`
    );
    const branches: Product[] = await response.json();
    const filteredProducts = branches.filter((product: Product) =>product.id===id)
    set(() => ({
      products: filteredProducts,
    }));

    return { products: filteredProducts };
  },
}));
