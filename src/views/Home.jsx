import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { RefreshCw, MapPin } from "lucide-react";
import AsyncSelect from "react-select/async";
import useWeatherStore from "../stores/useWeatherStore";
import useWilayahStore from "../stores/useWilayahStore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Home = () => {
  const {
    columnData,
    pieData,
    weatherList,
    loading,
    syncLoading,
    fetchDashboard,
    syncWeather,
  } = useWeatherStore();

  const { searchWilayah } = useWilayahStore();

  const [selectedWilayah, setSelectedWilayah] = useState(null);
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleSync = () => {
    if (selectedWilayah) {
      syncWeather(selectedWilayah.value);
    }
  };

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) return callback([]);
    searchWilayah(inputValue).then((options) => callback(options));
  };

  if (loading)
    return (
      <div className="p-10 text-center text-blue-600 font-bold">
        Memuat Data...
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Cuaca</h1>
          <p className="text-sm text-gray-500">
            Pantau data cuaca dan sinkronisasi wilayah
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 px-3 border-r min-w-75">
            <MapPin size={18} className="text-gray-400" />
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              value={selectedWilayah}
              onChange={(option) => setSelectedWilayah(option)}
              placeholder="Cari Kelurahan / Kode ADM4..."
              className="text-sm flex-1"
              styles={{
                control: (base) => ({
                  ...base,
                  border: 0,
                  boxShadow: "none",
                }),
              }}
            />
          </div>
          <button
            onClick={handleSync}
            disabled={syncLoading || !selectedWilayah}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={syncLoading ? "animate-spin" : ""}
            />
            {syncLoading ? "Syncing..." : "Sync Data"}
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Container */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 min-w-0">
          <h3 className="text-lg font-semibold mb-4 italic text-gray-700">
            Rata-rata Suhu Harian (°C)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={columnData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }} 
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("id-ID", {
                      weekday: "short",
                    })
                  }
                />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 40]} />
                <Tooltip
                  labelFormatter={(date) =>
                    new Date(date).toLocaleDateString("id-ID")
                  }
                />
                <Bar
                  dataKey="avg_temp"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Suhu Avg"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Container */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 min-w-0">
          <h3 className="text-lg font-semibold mb-4 italic text-gray-700">
            Distribusi Kondisi Cuaca
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-700">
            Daftar Log Cuaca Terkini
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-bold">Waktu Lokal</th>
                <th className="px-6 py-4 font-bold">Wilayah </th>
                <th className="px-6 py-4 font-bold">Kondisi</th>
                <th className="px-6 py-4 font-bold">Suhu</th>
                <th className="px-6 py-4 font-bold">Kelembapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {weatherList.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    {new Date(item.local_datetime).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {item.wilayah?.loc || "Wilayah tidak ditemukan"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      {item.weather_desc}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">
                    {item.t}°C
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.hu}%
                  </td>
                </tr>
              ))}
              {weatherList.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400 italic"
                  >
                    Data cuaca belum tersedia. Silakan lakukan sinkronisasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
