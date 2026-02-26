import { create } from 'zustand';
import axios from 'axios';

const useWeatherStore = create((set) => ({
  columnData: [],
  pieData: [],
  weatherList: [], // Data untuk tabel
  loading: false,
  syncLoading: false,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true });
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      // Ambil data dashboard
      const dashRes = await axios.get(`${apiUrl}/weather/dashboard`);
      // Ambil data list cuaca (All Weather)
      const listRes = await axios.get(`${apiUrl}/weather`);
      
      set({ 
        columnData: dashRes.data.column_chart || [], 
        pieData: dashRes.data.pie_chart || [],
        weatherList: listRes.data || [],
        loading: false 
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  syncWeather: async (adm4) => {
    set({ syncLoading: true });
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      // Hit API Sync dengan parameter adm4
      await axios.post(`${apiUrl}/weather/sync?adm4=${adm4}`);
      
      // Setelah sync berhasil, refresh data dashboard dan list
      const store = useWeatherStore.getState();
      await store.fetchDashboard();
      
      set({ syncLoading: false });
      alert("Sinkronisasi data berhasil!");
    } catch (err) {
      set({ syncLoading: false });
      alert("Gagal sinkronisasi: " + err.message);
    }
  }
}));

export default useWeatherStore;