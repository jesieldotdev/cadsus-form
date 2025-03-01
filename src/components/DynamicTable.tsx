import React from "react";

interface TableProps {
  data: Record<string, any>[]; // Array de objetos dinâmicos
  onRowClick?: (id: string) => void; // Callback para clique na linha
}

const DynamicTable: React.FC<TableProps> = ({ data, onRowClick }) => {
  if (!data.length) {
    return <div className="text-center text-gray-600">Nenhum dado disponível.</div>;
  }

  const columns = Object.keys(data[0]).filter((key) => key !== "id"); // Ignora o ID na tabela

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="py-3 px-6 text-left">
                {col}
              </th>
            ))}
            {/* <th className="py-3 px-6 text-center">Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-100 transition cursor-pointer"
              // onClick={() => onRowClick && onRowClick(row.id)}
            >
              {columns.map((col) => (
                <td key={col} className="py-3 px-6">
                  {row[col]}
                </td>
              ))}
              {/* <td className="py-3 px-6 text-center">
                <button className="text-indigo-600 hover:text-indigo-800">Ver Detalhes</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
