import { useState } from "react";
import ActivityTable from "../components/ActivityTable";
import ActivityModal from "../components/ActivityModal";

const ActivityPage = () => {
  const [activities, setActivities] = useState([
    { ID: 1, name: "Meeting Telkom", area_code: "31.71.01", activity_date: "2024-05-20T10:00:00Z", weather_status: "Cerah Berawan" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleAdd = () => {
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Yakin ingin menghapus?")) {
      setActivities(activities.filter(a => a.ID !== id));
    }
  };

  const handleSubmit = (formData) => {
    console.log("Data dikirim ke API:", formData);
    // Logika Fetch POST atau PUT di sini
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Kegiatan</h1>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Tambah Kegiatan
        </button>
      </div>

      <ActivityTable 
        data={activities} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <ActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        initialData={selectedData}
      />
    </div>
  );
};

export default ActivityPage;