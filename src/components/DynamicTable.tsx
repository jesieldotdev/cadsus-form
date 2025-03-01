import React from "react";

interface TableProps {
  data: Record<string, any>[]; 
  columnWidths?: Record<string, string>; 
}

const DynamicTable: React.FC<TableProps> = ({ data, columnWidths }) => {
  if (!data.length) {
    return <div className="text-center text-gray-600">Nenhum dado disponível.</div>;
  }

  const columns = Object.keys(data[0]).filter((key) => key !== "id"); 

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="py-3 px-6 text-left"
                style={{ minWidth: columnWidths?.[col] || "auto" }} 
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr  key={row.id} className="border-b hover:bg-gray-100 transition cursor-pointer">
              {columns.map((col) => (
                <td   key={col} className="py-3 px-6">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
