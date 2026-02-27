import { useState } from "react";

const ActivityModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    area_code: initialData?.area_code || "",
    activity_date: initialData?.activity_date
      ? initialData.activity_date.slice(0, 16)
      : "",
  }));

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      id="modal-overlay"
      onClick={(e) => e.target.id === "modal-overlay" && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Update" : "Tambah"} Kegiatan
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nama Kegiatan
              </label>
              <input
                className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Read-only Area Code saat edit */}
            {initialData && (
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 text-gray-400">
                  Wilayah Terpilih (Sync Terakhir)
                </label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 p-2.5 rounded-lg text-gray-500 cursor-not-allowed"
                  value={initialData.wilayah?.loc || initialData.area_code}
                  disabled
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Tanggal & Waktu
              </label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.activity_date}
                onChange={(e) =>
                  setFormData({ ...formData, activity_date: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 rounded-lg text-sm text-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg"
            >
              {initialData ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;
