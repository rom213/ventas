import { readJson, writeJson } from "@/data/json";
import { Branch } from "@/types/branch";
import { Customer } from "@/types/customer";
import { create } from "zustand";

interface BranchStore {
  path: string;
  branches: [] | Branch[];
  allBranches: () => void;
  findBranch: (id: number) => Promise<{ branches: Branch[] }>;
  /* 


 
  saveSale:()=>void,
*/
}

export const BranchStore = create<BranchStore>((set, get) => ({
  path: "../src/data/sucursales.json",
  branches: [],

  allBranches: async () => {
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
      const branches: Branch[] = await response.json();
      set(() => ({ branches }));
    } else {
      console.error("Failed to fetch users:", await response.json());
    }
  },

  findBranch: async (id:number) => {
    const state = get();
    const response = await fetch(
      `/api/data?path=${encodeURIComponent(state.path)}`
    );
    const branches: Branch[] = await response.json();
    const filteredBranches = branches.filter((branch: Branch) =>branch.id===id)
    set(() => ({
      branches: filteredBranches,
    }));

    return { branches: filteredBranches };
  },
}));
