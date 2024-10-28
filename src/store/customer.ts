import { Customer } from "@/types/customer";
import { create } from "zustand";

interface CustomerStore {
  path: string;
  user: Customer | null;
  users: [] | Customer[];
  updateUser: (data: Customer) => void;
  saveUser: () => void;
  allUsers: () => void;
  findUsers: (keyWord: string) => Promise<{ users: Customer[] }>;
  /* 


 
  saveSale:()=>void,
*/
}

export const CustomerStore = create<CustomerStore>((set, get) => ({
  path: "../src/data/clientes.json",
  user: null,
  users: [],
  updateUser: (data: Customer) => set(() => ({ user: data })),
  saveUser: async () => {
    set((state) => {
      if (state.user) {
        fetch("/api/users/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: state.user, path: state.path }),
        });
        return { user: null };
      }
      return state;
    });
  },
  allUsers: async () => {
    const state = get();
    const response = await fetch(
      `/api/users?path=${encodeURIComponent(state.path)}`,
      {
        // Pasar el path como parámetro
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const users: Customer[] = await response.json();
      set(() => ({ users }));
    } else {
      console.error("Failed to fetch users:", await response.json());
    }
  },
  findUsers: async (keyWord: string) => {
    const state = get(); // Obtener el estado actual
    const response = await fetch(
      `/api/data?path=${encodeURIComponent(state.path)}`
    );
    const users: Customer[] = await response.json();
    const filteredUsers = users.filter(
      (customer: Customer) =>
        customer.nombre.toLowerCase().includes(keyWord.toLowerCase()) ||
        customer.apellidos.toLowerCase().includes(keyWord.toLowerCase()));
    set(() => ({
      users: filteredUsers,
    }));

    return { users: filteredUsers };
  },
}));
