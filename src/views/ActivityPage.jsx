import { useEffect, useState } from "react";
import ActivityTable from "../components/ActivityTable";
import ActivityModal from "../components/ActivityModal";
import useActivityStore from "../stores/useActivityStore";

const ActivityPage = () => {
  const {
    activities,
    loading,
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useActivityStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalKey, setModalKey] = useState(0);
  const [sortBy, setSortBy] = useState("activity_date");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchActivities({
      search,
      sortBy,
      order,
    });
  }, []);
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchActivities({
        search,
        sortBy,
        order,
      });
    }, 500); // debounce 500ms

    return () => clearTimeout(delay);
  }, [search]);

  const handleAdd = () => {
    setSelectedData(null);
    setModalKey((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus kegiatan ini?")) {
      deleteActivity(id);
    }
  };
  const handleSort = (field) => {
    let newOrder = "asc";

    if (sortBy === field && order === "asc") {
      newOrder = "desc";
    }

    setSortBy(field);
    setOrder(newOrder);

    fetchActivities({
      search,
      sortBy: field,
      order: newOrder,
    });
  };

  const handleSubmit = async (formData) => {
    let success;

    if (selectedData) {
      success = await updateActivity(selectedData.id, formData);
    } else {
      success = await addActivity(formData);
    }

    if (success) handleCloseModal();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Kegiatan
          </h1>
          <p className="text-sm text-gray-500">
            Data cuaca akan otomatis sinkron saat disimpan
          </p>
        </div>

        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
          >
            + Tambah Kegiatan
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p>Memuat data kegiatan...</p>
        </div>
      ) : (
        <ActivityTable
          data={activities}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      )}

      <ActivityModal
        key={modalKey}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedData}
      />
    </div>
  );
};

export default ActivityPage;
