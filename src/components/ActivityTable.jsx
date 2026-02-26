import { Edit2, Trash2, Cloud } from "lucide-react"; // Gunakan lucide-react untuk icon

const ActivityTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Kegiatan</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Wilayah (Code)</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Jadwal</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status Cuaca</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.ID} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{item.Name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.AreaCode}</td>
              <td className="px-6 py-4 text-sm">
                {new Date(item.ActivityDate).toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  <Cloud size={14} /> {item.WeatherStatus || "Pending"}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => onDelete(item.ID)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;