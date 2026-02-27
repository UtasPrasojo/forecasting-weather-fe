import { Edit2, Trash2, Cloud, ArrowUpDown } from "lucide-react";

const ActivityTable = ({ data, onEdit, onDelete, sortBy, order, onSort }) => {
  const renderSortIcon = (field) => {
    if (sortBy !== field)
      return <ArrowUpDown size={14} className="inline ml-1" />;
    return order === "asc" ? "▲" : "▼";
  };

  const sortableHeader = (label, field) => (
    <th
      onClick={() => onSort(field)}
      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
    >
      {label} {renderSortIcon(field)}
    </th>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            {sortableHeader("Kegiatan", "name")}
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Wilayah (Code)
            </th>
            {sortableHeader("Jadwal", "activity_date")}
            {sortableHeader("Status Cuaca", "weather_status")}
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-800">
                {item.name}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {item.wilayah.loc}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(item.activity_date).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                    item.weather_status?.includes("Hujan")
                      ? "bg-red-50 text-red-600"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <Cloud size={14} /> {item.weather_status || "Menunggu Sync"}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
