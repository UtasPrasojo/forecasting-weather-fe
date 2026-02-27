import { create } from "zustand";
import axios from "axios";

const useActivityStore = create((set, get) => ({
  activities: [],
  loading: false,

  fetchActivities: async () => {
    set({ loading: true });
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/activity`);
      set({ activities: response.data || [], loading: false });
    } catch (err) {
      console.error("Gagal mengambil kegiatan:", err);
      set({ loading: false });
    }
  },

  addActivity: async (formData) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const payload = {
        ...formData,
        activity_date: new Date(formData.activity_date).toISOString(),
      };
      await axios.post(`${apiUrl}/activity`, payload);
      get().fetchActivities();
      return true;
    } catch (err) {
      console.error("Gagal menambah kegiatan:", err);
      return false;
    }
  },

  updateActivity: async (id, formData) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const payload = {
        ...formData,
        activity_date: new Date(formData.activity_date).toISOString(),
      };
      await axios.put(`${apiUrl}/activity/update?id=${id}`, payload);
      get().fetchActivities();
      return true;
    } catch (err) {
      console.error("Gagal update kegiatan:", err);
      return false;
    }
  },

  // Hapus kegiatan
  deleteActivity: async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/activity/delete?id=${id}`);
      get().fetchActivities(); // Refresh tabel
    } catch (err) {
      console.error("Gagal menghapus kegiatan:", err);
    }
  },
}));

export default useActivityStore;