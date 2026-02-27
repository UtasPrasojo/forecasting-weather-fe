import { useState } from "react";
import AsyncSelect from "react-select/async";
import useWilayahStore from "../stores/useWilayahStore";

const ActivityModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { searchWilayah } = useWilayahStore();

  // Inisialisasi state LANGSUNG dari props
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    area_code: initialData?.area_code || "",
    // Potong string tanggal agar sesuai format input datetime-local (YYYY-MM-DDThh:mm)
    activity_date: initialData?.activity_date
      ? initialData.activity_date.slice(0, 16)
      : "",
  });

  if (!isOpen) return null;

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) return callback([]);
    searchWilayah(inputValue).then(callback);
  };

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
                className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Lokasi Wilayah
              </label>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                // Menampilkan label yang informatif
                value={
                  formData.area_code
                    ? { value: formData.area_code, label: formData.area_code }
                    : null
                }
                onChange={(opt) =>
                  setFormData({ ...formData, area_code: opt ? opt.value : "" })
                }
                placeholder="Cari lokasi..."
                isClearable
              />
            </div>

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
              className="px-5 py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 text-sm font-semibold transition-transform active:scale-95"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;
