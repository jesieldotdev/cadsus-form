import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Phone, User, Trash2, Table, List } from "lucide-react";
import useStore from "../../hooks/useStore";
import DynamicTable from "../../components/DynamicTable";

const DomicileDetail: React.FC = () => {
  const [, actions, select] = useStore();
  const { domicileId } = useParams<{ domicileId: string }>();
  const navigate = useNavigate();

  const columnConfig = {
    'Nome': "250px",
    'Idade': '150px'
  };

  const {
    domicile: { getDomicileById, deleteDomicileById },
  } = actions;

  const domicile = domicileId ? getDomicileById(domicileId) : null;

  if (!domicile) {
    return <div>O domicílio não foi encontrado.</div>;
  }

  
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");

  
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este domicílio?")) {
      deleteDomicileById(domicileId);
      navigate(-1); 
    }
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/member/${memberId}`);
  };

  
  const familyMembersData = domicile.familyMembers.map((member) => ({
    CNS: member.sus,
    Nome: member.name,
    Idade: member.dateOfBirth,
    Parentesco: member.type,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb com botão de voltar */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
        >
          <span className="font-semibold">Voltar</span>
        </button>
        <span>/</span>
        <span className="font-medium text-gray-600">Detalhes do Domicílio</span>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">Detalhes do Domicílio</h1>

        {/* Botão de excluir */}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Trash2 size={18} />
          <span>Excluir</span>
        </button>
      </div>

      {/* Informações do Domicílio */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mt-4">
        <div className="flex items-center space-x-3">
          <MapPin className="text-indigo-600" size={20} />
          <span className="text-lg font-medium text-gray-700">{domicile.homeAddress}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="text-green-600" size={20} />
          <span className="text-sm text-gray-600">{domicile.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <User className="text-blue-600" size={20} />
          <span className="text-sm text-gray-600">{domicile.extraData.residentsQuantity} moradores</span>
        </div>

        {/* Informações adicionais */}
        <div className="text-sm text-gray-600">
          <p><strong>Tipo de residência:</strong> {domicile.extraData.residenceType}</p>
          <p><strong>Tipo de acesso:</strong> {domicile.extraData.accessToResidenceType}</p>
          <p><strong>Material predominante de construção:</strong> {domicile.extraData.predominantConstructionMaterial}</p>
          <p><strong>Disponibilidade de energia elétrica:</strong> {domicile.extraData.electricityAvailability ? "Sim" : "Não"}</p>
          <p><strong>Animais:</strong> {domicile.extraData.animalTypes}</p>
        </div>
      </div>

      {/* Lista de membros */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-indigo-700">Membros da Família</h2>
          
          {/* Alternador de visualização */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-2 rounded-lg transition ${
                viewMode === "cards" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition ${
                viewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <Table size={20} />
            </button>
          </div>
        </div>

        {/* Exibição dinâmica de membros */}
        {familyMembersData.length > 0 ? (
          viewMode === "table" ? (
            <DynamicTable data={familyMembersData} columnWidths={columnConfig} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {domicile.familyMembers.map((member) => (
                <div
                  key={member.sus}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <User className="text-blue-600" size={20} />
                    <span className="text-lg font-medium text-gray-700">{member.name}</span>
                  </div>
                  <p className="text-gray-600"><strong>CNS:</strong> {member.sus}</p>
                  <p className="text-gray-600"><strong>Idade:</strong> {member.dateOfBirth}</p>
                  <p className="text-gray-600"><strong>Parentesco:</strong> {member.type}</p>
                  <button
                    onClick={() => navigate(`/member/${member.sus}`)}
                    className="text-indigo-600 hover:text-indigo-800 mt-2"
                  >
                    Ver Detalhes
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-gray-600">Nenhum membro cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default DomicileDetail;
