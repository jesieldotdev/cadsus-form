import React, { useState } from "react";
import { MapPin, Phone, User, Table, List, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import DynamicTable from "../../components/DynamicTable";
import { PrintPDF } from "../Print";

interface Actions {
  id: string
}

const DomicileList: React.FC = () => {
  const navigate = useNavigate();
  const [, actions, select] = useStore();
  const { domicile: { deleteDomicileById, getDomicileById } } = actions;

  const domiciles = select("domicile.items");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDomicileClick = (domicileId: string) => {
    navigate(`/domicile/${domicileId}`);
  };

  
  const handleDelete = (domicileId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este domicílio?")) {
      console.log(domicileId);
    }
  };

  const DomicileListData = domiciles.map((item) => ({
    id: item.id,
    Endereço: item.homeAddress,
    Telefone: item.phone,
    Moradores: item.extraData.residentsQuantity,
  }));

  const filteredDomicileList = DomicileListData.filter((domicilio) =>
    Object.values(domicilio)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columnConfig = {
    Endereço: "300px",
    Telefone: "150px",
    Moradores: "100px",
  };

  const ActionButtons = ({ id }: Actions) => {
    return (
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => handleDomicileClick(id)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Ver Detalhes
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="text-red-600 hover:text-red-800 flex items-center space-x-1"
        >
          <Trash2 size={18} />
          <span>Excluir</span>
        </button>

        {getDomicileById(id) ? <PrintPDF formState={getDomicileById(id)}  /> : null}
      </div>
  
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Breadcrumb e botões de alternância */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
          >
            <span className="font-semibold">Início</span>
          </button>
          <span>/</span>
          <span className="font-medium text-gray-600">Lista de Domicílios</span>
        </div>

        {/* Alternador de visualização */}
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("cards")}
            className={`p-2 rounded-lg transition ${viewMode === "cards" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition ${viewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
          >
            <Table size={20} />
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Lista de Domicílios</h1>

      {/* Campo de pesquisa */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Pesquisar..."
          className="w-full max-w-md px-4 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      {/* Renderiza a visualização escolhida */}
      {filteredDomicileList.length > 0 ? (
        viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDomicileList.map((domicilio) => (
              <div
                key={domicilio.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
              >
                {Object.entries(domicilio).map(
                  ([key, value]) =>
                    key !== "id" && (
                      <div key={key} className="flex items-center space-x-3">
                        {key === "Endereço" && <MapPin className="text-indigo-600" size={20} />}
                        {key === "Telefone" && <Phone className="text-green-600" size={20} />}
                        {key === "Moradores" && <User className="text-blue-600" size={20} />}
                        <span className="text-sm text-gray-600">
                          <strong>{key}:</strong> {value}
                        </span>
                      </div>
                    )
                )}

                <ActionButtons id={domicilio.id} />
              </div>
            ))}
          </div>
        ) : (
          <DynamicTable
            columnWidths={columnConfig}
            data={filteredDomicileList.map((domicilio) => ({
              ...domicilio,
              Ações: (
                <ActionButtons id={domicilio.id} />
              ),
            }))}
          />
        )
      ) : (
        <div className="text-center text-gray-600">Nenhum domicílio encontrado.</div>
      )}
    </div>
  );
};

export default DomicileList;
