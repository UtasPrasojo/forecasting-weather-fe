import { useEffect, useState } from "react";
import ActivityTable from "../components/ActivityTable";
import ActivityModal from "../components/ActivityModal";
import useActivityStore from "../stores/useActivityStore"; // Import store

const ActivityPage = () => {
  const { activities, loading, fetchActivities, addActivity, updateActivity, deleteActivity } = useActivityStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAdd = () => {
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Yakin ingin menghapus kegiatan ini?")) {
      deleteActivity(id);
    }
  };

  const handleSubmit = async (formData) => {
    let success;
    if (selectedData) {
      success = await updateActivity(selectedData.id, formData);
    } else {
      success = await addActivity(formData);
    }

    if (success) setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kegiatan</h1>
          <p className="text-sm text-gray-500">Data cuaca akan otomatis sinkron saat disimpan</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
        >
          + Tambah Kegiatan
        </button>
      </div>

      {loading ? (
        <div className="text-center p-10 text-gray-500">Memuat data...</div>
      ) : (
        <ActivityTable 
          data={activities} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

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