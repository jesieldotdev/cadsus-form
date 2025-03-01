import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Phone, User, Trash2 } from "lucide-react"; // Adicionado Trash2 para ícone de lixeira
import useStore from "../../hooks/useStore";

const DomicileDetail: React.FC = () => {
  const [, actions, select] = useStore();
  const { domicileId } = useParams<{ domicileId: string }>();
  const navigate = useNavigate();

  const {
    domicile: { getDomicileById, deleteDomicileById },
  } = actions;

  const domicile = domicileId ? getDomicileById(domicileId) : null;

  if (!domicile) {
    return <div>O domicílio não foi encontrado.</div>;
  }

  // Função para excluir o domicílio
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este domicílio?")) {
      deleteDomicileById(domicileId);
      navigate(-1); // Volta para a página anterior após excluir
    }
  };

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
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Membros da Família</h2>
        <ul className="space-y-4">
          {domicile.familyMembers.map((member, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <User className="text-blue-600" size={20} />
                <span className="text-lg font-medium text-gray-700">{member.name}</span>
              </div>
              <button
                onClick={() => navigate(`/member/${member.sus}`)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Ver Detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DomicileDetail;
