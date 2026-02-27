import { create } from 'zustand';
import axios from 'axios';

const useWeatherStore = create((set) => ({
  columnData: [],
  pieData: [],
  weatherList: [], 
  loading: false,
  syncLoading: false,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true });
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const dashRes = await axios.get(`${apiUrl}/weather/dashboard`);
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
      await axios.post(`${apiUrl}/weather/sync?adm4=${adm4}`);
      
      const store = useWeatherStore.getState();
      await store.fetchDashboard();
      
      set({ syncLoading: false });
    } catch (err) {
      set({ syncLoading: false });
      alert("Gagal sinkronisasi: " + err.message);
    }
  }
}));

export default useWeatherStore;