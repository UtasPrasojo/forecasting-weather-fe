import { create } from "zustand";
import axios from "axios";

const useWilayahStore = create(() => ({
  loading: false,
  // Fungsi untuk fetch data wilayah berdasarkan pencarian
  searchWilayah: async (query) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/wilayah?q=${query}`);

      // Mapping: label menggunakan nama lokasi (loc), value menggunakan kode
      return response.data.map((w) => ({
        value: w.code, // Ini yang dikirim ke API Sync
        label: w.loc, // Ini yang tampil di pilihan user
      }));
    } catch (err) {
      console.error("Gagal load wilayah:", err);
      return [];
    }
  },
}));

export default useWilayahStore;
