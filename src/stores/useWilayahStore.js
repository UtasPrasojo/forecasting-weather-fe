import { create } from "zustand";
import axios from "axios";

const useWilayahStore = create(() => ({
  loading: false,
  searchWilayah: async (query) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/wilayah?q=${query}`);

      return response.data.map((w) => ({
        value: w.code, 
        label: w.loc, 
      }));
    } catch (err) {
      console.error("Gagal load wilayah:", err);
      return [];
    }
  },
}));

export default useWilayahStore;
